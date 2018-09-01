// // JSON对象列表1： 线号 -- 站点(站点名+工位号)
// var objSomeLine = 
// {
// 	"line_name":"线号1",
// 	"stations":["站点1","站点2","站点3","工位号4"],				
// };

// // JSON对象列表2： 机种 -- 线号 -- 站点列表[站点名+工位号+物料列表[物料名称+物料编号+物料数量] ]
// var objSomeProduct = 
// {
// 	"product_code":"xxxx_pro_xx3",
// 	"line_name":"线号1",
// 	"stations_use":[
// 		{
// 			"station_name":"站点1",
// 			"materials":[
// 				{
// 					"material_name":"玻璃片",
// 					"material_code":"uyyu3",
// 				},

// 				{
// 					"material_name":"玻璃片",
// 					"material_code":"uyyu3",
// 				},

// 				{
// 					"material_name":"玻璃片",
// 					"material_code":"uyyu3",
// 				},
// 			]
// 		},

// 		{
// 			"station_name":"站点2",
// 			"materials":[
// 				{
// 					"material_name":"玻璃片",
// 					"material_code":"uyyu3",
// 				},

// 				{
// 					"material_name":"玻璃片",
// 					"material_code":"uyyu3",
// 				},

// 				{
// 					"material_name":"玻璃片",
// 					"material_code":"uyyu3",
// 				},
// 			]
// 		},
// 	],
// };

var X = XLSX;
var global_wb;

var global_json_data = null;//[原始的]json数据

var global_line_stations = new Array();//json数据转换出来的 所有的线路和站点 （一个线路对应多个站点）
var global_products = new Array();//json数据转换出来的 所有的机种 (一个机种包含如下信息: 机种名字 线号 多个站点  没个站点下面有多个材料 材料包含 材料名和 材料编号)

var global_vue = null;

var ros = null;
var waypointUtils = null;

var idleInfo = '当前未执行任务';

function parseLineStation() {
    let json = JSON.parse(global_json_data);
    let sheet1 = json["Sheet1"];
    for (let i = 1; i < sheet1.length; ++i) {
        let linedata = sheet1[i];
        //lineData是一个string[5]
        let line_name = JSON.stringify(linedata[0]).replace(/"/g, "");
        let station_name = JSON.stringify(linedata[1]).replace(/"/g, "");
        let product_code = JSON.stringify(linedata[2]).replace(/"/g, "");
        let material_name = JSON.stringify(linedata[3]).replace(/"/g, "");
        let material_code = "";
        if (linedata.length > 4)
            material_code = JSON.stringify(linedata[4]).replace(/"/g, "");

        let needSaveLine = true;
        let savelineto;
        let needSaveStation = true;

        for (let j = 0; j < global_line_stations.length; ++j) {
            if (global_line_stations[j].line_name === line_name) {
                //这条线已经存在了
                needSaveLine = false;
                for (let mm = 0; mm < global_line_stations[j].stations.length; ++mm) {
                    if (global_line_stations[j].stations[mm] === station_name) {
                        //这条线和这个站点都存在了，不用保存
                        needSaveStation = false
                        break;
                    }
                }

                if (needSaveStation) {
                    let xx = global_line_stations[j];
                    xx.stations.push(station_name);
                    global_line_stations.splice(j, 1);
                    global_line_stations.push(xx);
                    break;
                }
            }
        }

        //全新的一条线
        if (needSaveLine) {
            let oneLineStation = {};
            oneLineStation.line_name = line_name;
            oneLineStation.stations = new Array();
            oneLineStation.stations.push(station_name);
            global_line_stations.push(oneLineStation);
        }
    }
}


function parseProduct() {
    let json = JSON.parse(global_json_data);
    let sheet1 = json["Sheet1"];
    for (let i = 1; i < sheet1.length; ++i) {
        let linedata = sheet1[i];
        //lineData是一个string[5]
        let line_name = JSON.stringify(linedata[0]).replace(/"/g, "");
        let station_name = JSON.stringify(linedata[1]).replace(/"/g, "");
        let product_code = JSON.stringify(linedata[2]).replace(/"/g, "");
        let material_name = JSON.stringify(linedata[3]).replace(/"/g, "");
        let material_code = "";
        if (linedata.length > 4)
            material_code = JSON.stringify(linedata[4]).replace(/"/g, "");

        //是否存在该product
        let existProduct = false;
        let thisPoroductIndex;
        for (let ii = 0; ii < global_products.length; ++ii) {
            if (global_products[ii].product_code === product_code && global_products[ii].line_name === line_name) {
                existProduct = true;
                thisPoroductIndex = ii;
                break;
            }
        }

        //如果不存在，直接就地保存
        if (!existProduct) {
            let saveProduct = {};
            saveProduct.product_code = product_code;//保存机种
            saveProduct.line_name = line_name;//保存线号
            saveProduct.stations_use = new Array();//站点们(站点包含 站点名 材料们)

            //保存一个站点 和 一个该站点的材料
            let oneStationAndMaterial = {};
            oneStationAndMaterial.station_name = station_name;//站点名
            oneStationAndMaterial.materials = new Array();//材料们
            let oneMaterial = {};//一个材料，包含材料名和材料代码
            oneMaterial.material_name = material_name;//材料名
            oneMaterial.material_code = material_code;//材料代码
            oneStationAndMaterial.materials.push(oneMaterial);

            saveProduct.stations_use.push(oneStationAndMaterial);

            global_products.push(saveProduct);
            continue;
        }

        //如果存在了，那么判断这个站点是否已经包含
        let thisPoroduct = global_products[thisPoroductIndex];

        //查找是否包含该站点
        let containStation = false;
        let thisStationIndex;//找到的话，索引号
        let thisStation;//找到的话，该站点
        for (let jj = 0; jj < thisPoroduct.stations_use.length; ++jj) {
            if (thisPoroduct.stations_use[jj].station_name === station_name) {
                containStation = true;
                thisStationIndex = jj;
                thisStation = thisPoroduct.stations_use[jj];
                break;
            }
        }

        //站点不存在需要添加站点
        if (!containStation) {
            let oneStationAndMaterial = {};
            oneStationAndMaterial.station_name = station_name;
            oneStationAndMaterial.materials = new Array();
            let oneMaterial = {};
            oneMaterial.material_name = material_name;
            oneMaterial.material_code = material_code;
            oneStationAndMaterial.materials.push(oneMaterial);
            thisPoroduct.stations_use.push(oneStationAndMaterial);
            global_products.splice(thisPoroductIndex, 1);
            global_products.push(thisPoroduct);
            continue;
        }

        //如果站点存在了，那么只剩下材料加上了
        let oneMaterial = {};
        oneMaterial.material_name = material_name;
        oneMaterial.material_code = material_code;
        thisStation.materials.push(oneMaterial);
        thisPoroduct.stations_use.splice(thisStationIndex, 1);
        thisPoroduct.stations_use.push(thisStation);

        global_products.splice(thisPoroductIndex, 1);
        global_products.push(thisPoroduct);
    }
}

function to_json(workbook) {
    let result = {};
    workbook.SheetNames.forEach(function (sheetName) {
        let roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
        if (roa.length) result[sheetName] = roa;
    });
    return JSON.stringify(result, 2, 2);
}

//载入Excel文件
function loadExcelFile() {
    let oFiles = document.querySelector("#file").files;
    let file = oFiles[0]

    let reader = new FileReader();
    reader.onloadend = function (e) {
        let data = e.target.result;
        data = new Uint8Array(data);
        let wb = X.read(data, { type: 'array' });
        if (wb === undefined) {
            alert("读取文件错误!");
            return;
        }
        global_json_data = to_json(wb);

        //将json对象转换层 我们定义的类对象
        parseLineStation();//获取线号 - 站点s 对应关系

        parseProduct();//获取 机种 - 站点 - 材料 对应关系

        //重新赋值
        global_vue.line_stations = global_line_stations;
        global_vue.products = global_products;

        //隐藏打开文件界面、显示正常界面
        $('#choosefilediv').hide();
        $('#app').show();
    }
    reader.readAsArrayBuffer(file);
}

function addback () {
	console.log(this)
}
/**
 * initialize ROS
 */
function initialize_ros() {
    ros = new ROSLIB.Ros();
    var ws_url = "ws://" + window.location.hostname + ":9090";
    ros.connect(ws_url);
    ros.on("connection", function () {
        waypointUtils = new WaypointsUtils(ros);
    });
}

function parseBattery(battery_h, battery_l) {
    let battery_h_ascii = String.fromCharCode(battery_h);
    let battery_l_ascii = String.fromCharCode(battery_l);
    return parseInt(battery_h_ascii, 16) * 16 + parseInt(battery_l_ascii, 16);
}

/**
 * monitor battery status
 */
function monitor_battery() {
    var topic = new ROSLIB.Topic({
        ros: ros,
        name: '/waypoint_user_sub',
        messageType: 'std_msgs/String'
    });
    topic.subscribe(function (msg) {
        let header = msg.data.split(':')[0].trim();
        if (header === "power") {
            if (global_vue) {
                let values = msg.data.split(':')[1].trim();
                let battery_h_s = values.split(',')[0].trim();
                let battery_l_s = values.split(',')[1].trim();
                let battery = parseBattery(parseInt(battery_h_s), parseInt(battery_l_s));
                global_vue.battery = battery;
            }
        }
    });
}

function getBgColorByLine(line)
{
	let color = colorMap[line];
	if (color === undefined)
	{
		return 'rgba(0,0,0,0.5)'
	};
	return color;
}

$(function () {

    initialize_ros();
    monitor_battery();

    $("#dialog_delete").dialog({
        autoOpen: false,
        width: 400,
        buttons: [
            {
                text: "Ok",
                click: function () {
                    $(this).dialog("close");
                    global_vue.displays.splice(global_vue.delete_display_index, 1);
                    global_vue.line_bgcolors.splice(global_vue.delete_display_index, 1);
                }
            },
            {
                text: "Cancel",
                click: function () {
                    $(this).dialog("close");
                }
            }
        ]
    });

    $("#dialog_delete_all").dialog({
        autoOpen: false,
        width: 400,
        buttons: [
            {
                text: "Ok",
                click: function () {
                    $(this).dialog("close");
                    while (global_vue.displays.length) global_vue.displays.pop();
                    while (global_vue.line_bgcolors.length) global_vue.line_bgcolors.pop();
                    this.executing_task = idleInfo;
                }
            },
            {
                text: "Cancel",
                click: function () {
                    $(this).dialog("close");
                }
            }
        ]
    });
    global_vue = new Vue({
        el: '#app',
        data: {
            //主属性：（添加变化监视）
            currentTabPage: 0,//tab的当前页号
            perpageTab: 10,//tab每页显示多少个
            searchkey: "",//搜索框输入内容
            currentTab: 0,//当前显示数据[showProduct]中的索引号
            line_stations: [],//全部的line_stations
            products: [],//全部的机种
            line_bgcolors: [],//选择不同线别物料背景颜色

            //附属性：跟随上面的属性变化的属性
            searchFilter: [],
            itemCount: 0,
            totalPage: 0,
            startShowIndex: 0,
            showLines: [],
            showStations: [],
            showStationMaterail: [],
            showProducts: [],
            showProductsIndex: 0,//默认选择第一个显示的product

            displays: [],
            delete_display_index: 0,//要删除的 index

            battery: 100,

            executing_task: '正在执行的任务',
        },

        watch: {
            battery: {
                handler(newval, oldval) {
                    let col;
                    if (this.battery <= 20) col = "red";
                    else if (this.battery <= 50) col = "yellow";
                    else if (this.battery) col = "green";
                    $('#battery_text').css("color", col);
                },
                deep: false,
            },
            line_stations: {
                handler(newval, oldval) {

                    //影响了显示的所有 线路
                    this.currentTabPage = 0;//tab的当前页号
                    this.currentTab = 0;//当前显示数据[showProduct]中的索引号
                    this.searchkey = "";
                    this.searchFilter = this.line_stations;
                    this.itemCount = this.searchFilter.length;
                    this.totalPage = this.itemCount % this.perpageTab === 0 ? Math.floor(this.itemCount / this.perpageTab) : Math.floor(this.itemCount / this.perpageTab) + 1;
                    this.startShowIndex = 0;
                    this.showLines = this.line_stations.slice(this.startShowIndex, this.startShowIndex + this.perpageTab);

                    //影响了线路对应的stations
                    this.showStations = [];
                    this.line_stations.forEach(linestation => {
                        //TODO:
                        if (this.showLines.length > this.currentTab && linestation.line_name === this.showLines[this.currentTab].line_name) {
                            this.showStations = linestation.stations;
                        }
                    });
                },
                deep: false,
            },
            products: {
                handler(newval, oldval) {
                    this.showStationMaterail = [];
                    this.showProducts = [];
                    if (this.showLines.length > 0) {
                        this.products.forEach(product => {
                            if (product.line_name == this.showLines[this.currentTab].line_name) {
                                this.showProducts.push(product);
                            }
                        });
                        if (this.showProducts.length > 0) {
                            let select_product = this.showProducts[this.showProductsIndex];
                            this.showStationMaterail = select_product.stations_use;
                        }
                    }
                },
                deep: false,
            },
            searchkey: {
                handler(newval, oldval) {
                    this.currentTabPage = 0;//tab的当前页号
                    this.currentTab = 0;//当前显示数据[showProduct]中的索引号
                    this.searchFilter = this.line_stations;
                    if (this.searchkey.length > 0) {
                        this.searchFilter = this.line_stations.filter(item => item.line_name.toUpperCase().indexOf(this.searchkey.toUpperCase()) >= 0);
                    }
                    this.itemCount = this.searchFilter.length;
                    this.totalPage = this.itemCount % this.perpageTab === 0 ? Math.floor(this.itemCount / this.perpageTab) : Math.floor(this.itemCount / this.perpageTab) + 1;
                    this.startShowIndex = 0;
                    this.showLines = this.searchFilter.slice(this.startShowIndex, this.startShowIndex + this.perpageTab);

                    this.showStations = [];
                    this.line_stations.forEach(linestation => {
                        if (this.showLines.length > this.currentTab && linestation.line_name === this.showLines[this.currentTab].line_name) {
                            this.showStations = linestation.stations;
                        }
                    });

                    this.showStationMaterail = [];
                    this.showProducts = [];
                    if (this.showLines.length > 0) {
                        this.products.forEach(product => {
                            if (product.line_name == this.showLines[this.currentTab].line_name) {
                                this.showProducts.push(product);
                            }
                        });
                        if (this.showProducts.length > 0) {
                            let select_product = this.showProducts[this.showProductsIndex];
                            this.showStationMaterail = select_product.stations_use;
                        }
                    }
                },
                deep: true
            },
            currentTabPage: {
                handler(newval, oldval) {
                    this.currentTab = 0;//当前显示数据[showProduct]中的索引号
                    this.startShowIndex = this.currentTabPage * this.perpageTab;
                    this.showLines = this.searchFilter.slice(this.startShowIndex, this.startShowIndex + this.perpageTab);
                    this.showStations = [];
                    this.line_stations.forEach(linestation => {
                        if (this.showLines.length > this.currentTab && linestation.line_name === this.showLines[this.currentTab].line_name) {
                            this.showStations = linestation.stations;
                        }
                    });
                    this.showStationMaterail = [];
                    this.showProducts = [];
                    if (this.showLines.length > 0) {
                        this.products.forEach(product => {
                            if (product.line_name == this.showLines[this.currentTab].line_name) {
                                this.showProducts.push(product);
                            }
                        });
                        if (this.showProducts.length > 0) {
                            let select_product = this.showProducts[this.showProductsIndex];
                            this.showStationMaterail = select_product.stations_use;
                        }
                    }
                },
                deep: true,
            },
            currentTab: {
                handler(newval, oldval) {
                    this.showStations = [];
                    this.line_stations.forEach(linestation => {
                        if (this.showLines.length > this.currentTab && linestation.line_name === this.showLines[this.currentTab].line_name) {
                            this.showStations = linestation.stations;
                        }
                    });

                    this.showStationMaterail = [];
                    this.showProducts = [];
                    if (this.showLines.length > 0) {
                        this.products.forEach(product => {
                            if (product.line_name == this.showLines[this.currentTab].line_name) {
                                this.showProducts.push(product);
                            }
                        });
                        if (this.showProducts.length > 0) {
                            let select_product = this.showProducts[this.showProductsIndex];
                            this.showStationMaterail = select_product.stations_use;
                        }
                    }
                },
                deep: true,
            },
        },
        methods: {
            nextPage() { if (this.currentTabPage + 1 < this.totalPage) this.currentTabPage += 1; },
            lastPage() { if (this.currentTabPage > 0) this.currentTabPage -= 1; },
            clicktab(index) { this.currentTab = index; },
            addok() {
                if (this.displays.length <= 0) {
                    alert("未选择任何物料!");
                    this.executing_task = idleInfo;
                    return;
                }                
                //TODO:调用接口
                //TODO:这里是否还需要备份一下呢？？
                if (waypointUtils !== null) {
                    if (waypointUtils.executeOne(this.displays[0].station_name)) {
                        this.executing_task = this.displays[0].line_name + '-' + this.displays[0].material_name + '-' + this.displays[0].station_name;                        
                        this.displays.shift();
               			this.line_bgcolors.shift();
                    } else {
                        alert("AGV正忙或不存在站点!");
                    }
                } else {
                    alert("库未初始化成功");
                }
            },
            allclear() {
                $("#dialog_delete_all").dialog("open");
            },
            addMaterial(material_name, material_code, station_name) {
                let d = {};
                d.material_name = material_name;
                d.material_code = material_code;
                d.station_name = station_name;
                d.line_name = this.showProducts[this.showProductsIndex].line_name;
                this.displays.push(d);
                // bg color
                let line_name = this.showLines[this.currentTab].line_name;
				let color = getBgColorByLine(line_name);
                this.line_bgcolors.push(color);
            },
            dis_delete(index) {                     /////////////准备删除一项
                this.delete_display_index = index;
                $("#dialog_delete").dialog("open");
            },
            continueTask() {
                //TODO:调用接口
                if (waypointUtils !== null) {
                    if (this.displays.length <= 0) {
                        waypointUtils.goHome();                        
                        this.executing_task = idleInfo;
                    } else {
                        if (waypointUtils.executeOne(this.displays[0].station_name)) {
                            this.executing_task = this.displays[0].line_name + '-' + this.displays[0].material_name + '-' + this.displays[0].station_name;
                            this.displays.shift();
               				this.line_bgcolors.shift();
                        } else {
                            alert("AGV正忙或不存在站点!");
                        }
                    }
                } else {
                    alert("库未初始化成功");
                }
            },
            backTask() {
                if (waypointUtils !== null)
                {
                    waypointUtils.goHome();                    
                    this.executing_task = idleInfo;
                }                    
                else {
                    alert("库未初始化成功");
                }
            },
            //显示返回按钮
            addshow() {
            	$("#backpage").css("right", "0")    
            	$("#close").css("display", "block") 
            	$("#more").css("display", "none") 
            },
            addhide() {
            	$("#backpage").css("right", "-100px")    
            	$("#close").css("display", "none")
            	$("#more").css("display", "block")
            },
        },
    });

    //显示打开文件界面，隐藏正常界面
    $('#app').hide();
    $('#choosefilediv').show();
    
});

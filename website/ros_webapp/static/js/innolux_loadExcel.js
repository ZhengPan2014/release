
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


function parseLineStation() {
    var json = JSON.parse(global_json_data);
    var sheet1 = json["Sheet1"];
    for (var i = 1; i < sheet1.length; ++i) {
        var linedata = sheet1[i];
        //lineData是一个string[5]
        var line_name = JSON.stringify(linedata[0]).replace(/"/g, "");
        var station_name = JSON.stringify(linedata[1]).replace(/"/g, "");
        var product_code = JSON.stringify(linedata[2]).replace(/"/g, "");
        var material_name = JSON.stringify(linedata[3]).replace(/"/g, "");
        var material_code = JSON.stringify(linedata[4]).replace(/"/g, "");

        var needSaveLine = true;
        var savelineto;
        var needSaveStation = true;

        for (var j = 0; j < global_line_stations.length; ++j) {
            if (global_line_stations[j].line_name === line_name) {
                //这条线已经存在了
                needSaveLine = false;
                for (var mm = 0; mm < global_line_stations[j].stations.length; ++mm) {
                    if (global_line_stations[j].stations[mm] === station_name) {
                        //这条线和这个站点都存在了，不用保存
                        needSaveStation = false
                        break;
                    }
                }

                if (needSaveStation) {
                    var xx = global_line_stations[j];
                    xx.stations.push(station_name);
                    global_line_stations.splice(j, 1);
                    global_line_stations.push(xx);
                    break;
                }
            }
        }

        //全新的一条线
        if (needSaveLine) {
            var oneLineStation = {};
            oneLineStation.line_name = line_name;
            oneLineStation.stations = new Array();
            oneLineStation.stations.push(station_name);
            global_line_stations.push(oneLineStation);
        }
    }
}


function parseProduct() {
    var json = JSON.parse(global_json_data);
    var sheet1 = json["Sheet1"];
    for (var i = 1; i < sheet1.length; ++i) {
        var linedata = sheet1[i];
        //lineData是一个string[5]
        var line_name = JSON.stringify(linedata[0]).replace(/"/g, "");
        var station_name = JSON.stringify(linedata[1]).replace(/"/g, "");
        var product_code = JSON.stringify(linedata[2]).replace(/"/g, "");
        var material_name = JSON.stringify(linedata[3]).replace(/"/g, "");
        var material_code = JSON.stringify(linedata[4]).replace(/"/g, "");

        //是否存在该product 
        var existProduct = false;
        var thisPoroductIndex;
        for (var ii = 0; ii < global_products.length; ++ii) {
            if (global_products[ii].product_code === product_code) {
                existProduct = true;
                thisPoroductIndex = ii;
                break;
            }
        }

        //如果不存在，直接就地保存
        if (!existProduct) {
            var saveProduct = {};
            saveProduct.product_code = product_code;//保存机种
            saveProduct.line_name = line_name;//保存线号
            saveProduct.stations_use = new Array();//站点们(站点包含 站点名 材料们)

            //保存一个站点 和 一个该站点的材料
            var oneStationAndMaterial = {};
            oneStationAndMaterial.station_name = station_name;//站点名
            oneStationAndMaterial.materials = new Array();//材料们
            var oneMaterial = {};//一个材料，包含材料名和材料代码
            oneMaterial.material_name = material_name;//材料名
            oneMaterial.material_code = material_code;//材料代码
            oneStationAndMaterial.materials.push(oneMaterial);

            saveProduct.stations_use.push(oneStationAndMaterial);

            global_products.push(saveProduct);
            continue;
        }

        //如果存在了，那么判断这个站点是否已经包含
        var thisPoroduct = global_products[thisPoroductIndex];

        //查找是否包含该站点
        var containStation = false;
        var thisStationIndex;//找到的话，索引号
        var thisStation;//找到的话，该站点
        for (var jj = 0; jj < thisPoroduct.stations_use.length; ++jj) {
            if (thisPoroduct.stations_use[jj].station_name === station_name) {
                containStation = true;
                thisStationIndex = jj;
                thisStation = thisPoroduct.stations_use[jj];
                break;
            }
        }

        //站点不存在需要添加站点
        if (!containStation) {
            var oneStationAndMaterial = {};
            oneStationAndMaterial.station_name = station_name;
            oneStationAndMaterial.materials = new Array();
            var oneMaterial = {};
            oneMaterial.material_name = material_name;
            oneMaterial.material_code = material_code;
            oneStationAndMaterial.materials.push(oneMaterial);
            thisPoroduct.stations_use.push(oneStationAndMaterial);
            global_products.splice(thisPoroductIndex, 1);
            global_products.push(thisPoroduct);
            continue;
        }

        //如果站点存在了，那么只剩下材料加上了
        var oneMaterial = {};
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
    var result = {};
    workbook.SheetNames.forEach(function (sheetName) {
        var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
        if (roa.length) result[sheetName] = roa;
    });
    return JSON.stringify(result, 2, 2);
}

//载入excel文件
function loadExcelFile() {
    var oFiles = document.querySelector("#file").files;
    var file = oFiles[0]

    var reader = new FileReader();
    reader.onloadend = function (e) {
        var data = e.target.result;
        data = new Uint8Array(data);
        var wb = X.read(data, { type: 'array' });
        if (wb === undefined) {
            alert("读取文件错误!");
            return;
        }
        global_json_data = to_json(wb);

        //将json对象转换层 我们定义的类对象
        parseLineStation();//获取线号 - 站点s 对应关系

        parseProduct();//获取 机种 - 站点 - 材料 对应关系

        //写入localStorage
        localStorage.setItem('qyh', 'qinyinghao');
        localStorage.setItem('global_line_stations', JSON.stringify(global_line_stations));
        localStorage.setItem('global_products', JSON.stringify(global_products));
        // 直接跳转  
        location.href = "index.html";
    }
    reader.readAsArrayBuffer(file);
}

'use strict';
var NET = NET || {
	lastNetworkSettingHandle: (config) => {
		var network = {};
		network['ssid'] = config.ssid || '';
		network['password'] = config.password || '';
		network['ip'] = config.ip || '';
		$('#network_ssid').val(network.ssid);
		$('#network_password').val(network.password);
		$('#network_ip').val(network.ip);
	}
};

$(() => {
	// switch to wifi
	$('#network_set').on('click', function(){
		var ssid = $('#network_ssid').val();
		var password = $('#network_password').val();
		var ip = $('#network_ip').val();
		var remember = $('#rememberNetSetting').attr('checked') === 'checked';
		console.log(`ssid: ${ssid}, password: ${password}, ip: ${ip}, remember: ${remember}`);
		if (!checkIp(ip))
		{
			ALERT.error({
				title: '参数错误',
				text: 'ip不合法'
			});
			return;
		}
		NAV.setNetwork(PARAMS.NetworkMode.wifi, {
			ssid: ssid,
			password: password,
			ip: ip,
			remember: remember
		});
		DATA.loading = '切换中';
		setTimeout(function(){
			window.location.href = `http://${ip}`;
		}, 10000);
		$('#network_settings').css('display', 'none');
	});

	// switch to ap
	$('#network_reset').on('click', function(){
		var remember = $('#rememberNetSetting').attr('checked') === 'checked';
		NAV.setNetwork(PARAMS.NetworkMode.ap, {
			remember: remember
		});
		// reconnect
		DATA.loading = '切换中';
		setTimeout(function(){
			window.location.href = `http://10.42.0.1`;
		}, 10000);
		$('#network_settings').css('display', 'none');
	});
});

function checkIp(ipStr)
{
    ipStr = ipStr.match(/(\d+)\.(\d+)\.(\d+)\.(\d+)/g);
    if (ipStr == null) 
    {
        return false;
    } 
    else if (RegExp.$1 > 255 || RegExp.$2 > 255 || RegExp.$3 > 255 || RegExp.$4 > 255) 
    {
        return false;
    } 
    else 
    {
        return true;
    }
}
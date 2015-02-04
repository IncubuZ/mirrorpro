
function loadFeed(){
	loadingShow("#contentHome");
	var output = $('#feedMiddle');
	output.empty();
	var url = serviceURL + 'loadFeed.php';
	$.ajax({
		url: url,
		dataType: 'jsonp',
		//jsonp: 'jsoncallback',
		timeout: 10000,
		success: function(data, status){
			console.log(status);
			//console.log(data);
			
			/*$.each(data, function(i,item){ 
				var feed = '<h1>'+item.report_by+'</h1>'
				+ '<p>'+item.report_id+'<br>'
				+ '<p>'+item.report_title+'<br>'
				+ '<p>'+item.report_content+'<br>'
				+ '<p>'+item.report_date+'<br>'
				+ '<p>'+item.report_lat+'<br>'
				+ '<p>'+item.report_long+'<br>'
				+ '<p>'+item.report_locat+'<br>'
				+ item.report_imgUrl+'</p>';

				output.append(feed);
			});*/
			
			$.each(data, function(i,item){ 
			var d = moment();
			var de = moment(item.report_date, 'YYYY-MM-DD HH:mm:ss', 'th');
				var reportHtml = '<div class="ui-corner-all custom-corners" id="reportView" data-report-date="'+item.report_date+'" data-report-id="'+item.report_id+'"><div class="ui-bar ui-bar-b"><h3><strong><span id="spNameFeed">' + item.report_realNameBy
				+ '</span></strong></h3></div><div class="ui-body ui-body-a"><div class="ui-grid-a">'
				 + '<div class="ui-block-a" id="miniPropicHome">' 
				 + '<img alt="" height="40" id="imgMiniPropicHome" src="'+serviceURL + "../img/userprofileimage/" + item.report_userImageUrl + "?" + d.format() + '" width="40">' 
				 + '</div><div class="ui-block-b" id="miniReportdetail">' 
				 + 'วันที่: <span id="spDateReport">' + de.format('DD MMMM YYYY')
				 + '</span><br>เวลา: <em><span id="spTimeReport">' + de.format('HH:mm:ss')
				 + '</span></em></div></div><div class="ui-grid-solo"><b>หัวเรื่อง:</b> <span id="spTitle">' + item.report_title
				 + '</span><br><b>รายละเอียด:</b> <em><span id="spContent">' + item.report_content
				 + '</span></em><br><br><img align="center" alt="" id="imgReport" src="' +serviceURL + "../img/reportPic/" + item.report_imgUrl + "?" + d.format()
				 + '"><b>สถานที่:</b> <em><span id="spLocatReport">' + item.report_locat
				 + '</span></em><br><img id="imgMapReport" src="http://maps.googleapis.com/maps/api/staticmap?center=' + item.report_lat + "," + item.report_long
				 + '&zoom=16&size=400x400&maptype=roadmap&markers=color:green%7C' + item.report_lat + "," + item.report_long
				 + '&sensor=true"></div></div><br>';
					
				output.append(reportHtml);
				loadingHide("#contentHome");
			});
		},
		error: function(){
		   output.text('พบข้อผิดพลาดในการโหลดข้อมูล!!');
		   				loadingHide("#contentHome");

		}
	});
	
}

function loadNewFeed(){
	
	var output = $('#feedTop');	
	var ff = 'new';
	var url = serviceURL + 'loadFeed.php';
	
	console.log(output.html().length);
///////////////////////////////////////////////////////////////////////////////////	
	if(output.html().length===0){
		var lastDiv = $('#feedMiddle').children('div:first-child');
		var lastDivDate = lastDiv.data('report-date');
		var lastDivId = lastDiv.data('report-id');
		console.log(lastDivId);
		console.log(ff);
		loadNewFeedAjax(output,ff,url,lastDiv,lastDivDate,lastDivId);
///////////////////////////////////////////////////////////////////////////////////	
	}else{
		
	var lastDiv = $('#feedTop').children('div:first-child');
	var lastDivDate = lastDiv.data('report-date');
	var lastDivId = lastDiv.data('report-id');
	console.log(lastDivId);
	console.log(ff);
	loadNewFeedAjax(output,ff,url,lastDiv,lastDivDate,lastDivId);
	}
}
/////////////////////////////////////////////////////////////////////////////////////////////	
function loadNewFeedAjax(output,ff,url,lastDiv,lastDivDate,lastDivId){
	$.ajax({
		type: 'GET',
		url: url,
		contentType: "application/json",
		dataType: 'jsonp',
		data: {
				feedFlag: ff,
				lastRepViewDate: lastDivDate,
				lastRepViewId: lastDivId
			},
		crossDomain: true,
		timeout: 10000,
		success: function(data, status){
			console.log(output.html());
			console.log(output.html().length);
			console.log(data);
			console.log(!jQuery.isEmptyObject(data));
		
		if (!jQuery.isEmptyObject(data)) {
			$.each(data, function(i,item){ 
			
			var d = moment();
			var de = moment(item.report_date, 'YYYY-MM-DD HH:mm:ss', 'th');
				var reportHtml = '<div class="ui-corner-all custom-corners" id="reportView" data-report-date="'+item.report_date+'" data-report-id="'+item.report_id+'"><div class="ui-bar ui-bar-b"><h3><strong><span id="spNameFeed">' + item.report_realNameBy
				+ '</span></strong></h3></div><div class="ui-body ui-body-a"><div class="ui-grid-a">'
				 + '<div class="ui-block-a" id="miniPropicHome">' 
				 + '<img alt="" height="40" id="imgMiniPropicHome" src="'+serviceURL + "../img/userprofileimage/" + item.report_userImageUrl + "?" + d.format() + '" width="40">' 
				 + '</div><div class="ui-block-b" id="miniReportdetail">' 
				 + 'วันที่: <span id="spDateReport">' + de.format('DD MMMM YYYY')
				 + '</span><br>เวลา: <em><span id="spTimeReport">' + de.format('HH:mm:ss')
				 + '</span></em></div></div><div class="ui-grid-solo"><b>หัวเรื่อง:</b> <span id="spTitle">' + item.report_title
				 + '</span><br><b>รายละเอียด:</b> <em><span id="spContent">' + item.report_content
				 + '</span></em><br><br><img align="center" alt="" id="imgReport" src="' +serviceURL + "../img/reportPic/" + item.report_imgUrl + "?" + d.format()
				 + '"><b>สถานที่:</b> <em><span id="spLocatReport">' + item.report_locat
				 + '</span></em><br><img id="imgMapReport" src="http://maps.googleapis.com/maps/api/staticmap?center=' + item.report_lat + "," + item.report_long
				 + '&zoom=16&size=400x400&maptype=roadmap&markers=color:green%7C' + item.report_lat + "," + item.report_long
				 + '&sensor=false"></div></div><br>';

				output.prepend(reportHtml);
			});
		}else{
			$("#pMsgFeed").text('ฟีดข่าวล่าสุดแล้ว.').show().css("color", "green").fadeOut(3200);
			console.log(output.html());
			//output.empty();
			}
		},
		error: function(){
			console.log(output.html().length);
		   output.text('พบข้อผิดพลาดในการโหลดข้อมูล!!');
		}
	});
	}
	
/////////////////////////////////////////////////////////////////////////////////////////////	
function loadOldFeed(){
	
	
	var output = $('#feedBottom');	
	var ff = 'old';
	var url = serviceURL + 'loadFeed.php';
	
	console.log(output.html().length);
///////////////////////////////////////////////////////////////////////////////////	
	if(output.html().length===0){
		var lastDiv = $('#feedMiddle').children('div:last-child');
		var lastDivDate = lastDiv.data('report-date');
		var lastDivId = lastDiv.data('report-id');
		console.log(lastDivId);
		console.log(ff);
		loadOldFeedAjax(output,ff,url,lastDiv,lastDivDate,lastDivId);
///////////////////////////////////////////////////////////////////////////////////	
	}else{
		
	var lastDiv = $('#feedBottom').children('div:last-child');
	var lastDivDate = lastDiv.data('report-date');
	var lastDivId = lastDiv.data('report-id');
	console.log(lastDivId);
	console.log(ff);
	loadOldFeedAjax(output,ff,url,lastDiv,lastDivDate,lastDivId);
	}
}

function loadOldFeedAjax(output,ff,url,lastDiv,lastDivDate,lastDivId){
	$.ajax({
		type: 'GET',
		url: url,
		contentType: "application/json",
		dataType: 'jsonp',
		data: {
				feedFlag: ff,
				lastRepViewDate: lastDivDate,
				lastRepViewId: lastDivId
			},
		crossDomain: true,
		timeout: 10000,
		success: function(data, status){
			console.log(output.html());
			console.log(output.html().length);
			console.log(data);
			console.log(!jQuery.isEmptyObject(data));
		
		if (!jQuery.isEmptyObject(data)) {
			$.each(data, function(i,item){ 
			var mapwidth = parseInt($('#imgMapReport').css("width"), 10); // remove 'px' from width value
			var mapheight = parseInt($('#imgMapReport').css("height"), 10);
			var d = moment();
			var de = moment(item.report_date, 'YYYY-MM-DD HH:mm:ss', 'th');
				var reportHtml = '<div class="ui-corner-all custom-corners" id="reportView" data-report-date="'+item.report_date+'" data-report-id="'+item.report_id+'"><div class="ui-bar ui-bar-b"><h3><strong><span id="spNameFeed">' + item.report_realNameBy
				+ '</span></strong></h3></div><div class="ui-body ui-body-a"><div class="ui-grid-a">'
				 + '<div class="ui-block-a" id="miniPropicHome">' 
				 + '<img alt="" height="40" id="imgMiniPropicHome" src="'+serviceURL + "../img/userprofileimage/" + item.report_userImageUrl + "?" + d.format() + '" width="40">' 
				 + '</div><div class="ui-block-b" id="miniReportdetail">' 
				 + 'วันที่: <span id="spDateReport">' + de.format('DD MMMM YYYY')
				 + '</span><br>เวลา: <em><span id="spTimeReport">' + de.format('HH:mm:ss')
				 + '</span></em></div></div><div class="ui-grid-solo"><b>หัวเรื่อง:</b> <span id="spTitle">' + item.report_title
				 + '</span><br><b>รายละเอียด:</b> <em><span id="spContent">' + item.report_content
				 + '</span></em><br><br><img align="center" alt="" id="imgReport" src="' +serviceURL + "../img/reportPic/" + item.report_imgUrl + "?" + d.format()
				 + '"><b>สถานที่:</b> <em><span id="spLocatReport">' + item.report_locat
				 + '</span></em><br><img id="imgMapReport" src="http://maps.googleapis.com/maps/api/staticmap?center=' + item.report_lat + "," + item.report_long
				 + '&zoom=16&size=400x400&maptype=roadmap&markers=color:green%7C' + item.report_lat + "," + item.report_long
				 + '&sensor=true"></div></div><br>';
//' + mapwidth + "x" + mapheight + '
				output.append(reportHtml);
			});
		}else{
			$("#pMsgFeedB").text('ฟีดข่าวเก่าสุดแล้ว.').show().css("color", "green").fadeOut(3200);
			console.log(output.html());
			//output.empty();
			}
		},
		error: function(){
			console.log(output.html().length);
		   output.text('พบข้อผิดพลาดในการโหลดข้อมูล!!');
		}
	});
	}
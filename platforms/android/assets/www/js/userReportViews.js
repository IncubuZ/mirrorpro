var uid;
function loadThisUserReport(){uid = window.localStorage.userId;loadUserReport();}
function loadOtherUserReport(){uid = $( "#getDetailThisUser" ).data( "otherUId");loadUserReport();}
function loadUserReport(){
	clearCache();//
	loadingShow("#contentUserReport");
	var output = $('#userReportMiddle');
	
	/*if(!$( "#getDetailThisUser" ).attr( "data-otherUId")){
		uid = window.localStorage.userId;
		}else if($( "#getDetailThisUser" ).data( "otherUId") !== 'undifined'){
			uid = $( "#getDetailThisUser" ).data( "otherUId");
			
			}*/
	console.log($( "#getDetailThisUser" ).data( "otherUId"));
	console.log(uid);
	output.empty();
	$('#userReportBottom').empty();
	$('#userReportTop').empty();
	var url = serviceURL + 'loadUserReport.php';
	$.ajax({
		type: 'GET',
		url: url,
		contentType: "application/json",
		dataType: 'jsonp',
		data: {
				userid: uid
			},
		//jsonp: 'jsoncallback',
		crossDomain: true,
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
			if (!jQuery.isEmptyObject(data)) {
			$.each(data, function(i,item){ 
			if(uid === window.localStorage.userId){
				htmlReportUser(item);
			}else{
				htmlReport(item);
				}
				output.append(reportHtml);
				loadingHide("#contentUserReport");
			});
			}else{
				loadingHide("#contentUserReport");
				$("#pMsgUserReport").text('คุณยังไม่มีรายงาน.').show().css("color", "green").fadeOut(3200);
			console.log(output.html());
				}
		},
		error: function(){
		   output.text('พบข้อผิดพลาดในการโหลดข้อมูล!!').show().css("color", "red").fadeOut(3200);
		   				loadingHide("#contentUserReport");

		}
	});
	
}

function loadNewUserReport(){
	
	var output = $('#userReportTop');	
	var ff = 'new';
	var url = serviceURL + 'loadUserReport.php';
	
	console.log(output.html().length);
///////////////////////////////////////////////////////////////////////////////////	
	if(output.html().length===0){
		var lastDiv = $('#userReportMiddle').children('div:first-child');
		var lastDivDate = lastDiv.data('report-date');
		var lastDivId = lastDiv.data('report-id');
		console.log(lastDivId);
		console.log(ff);
		loadNewUserReportAjax(output,ff,url,lastDiv,lastDivDate,lastDivId);
///////////////////////////////////////////////////////////////////////////////////	
	}else{
		
	var lastDiv = $('#userReportTop').children('div:first-child');
	var lastDivDate = lastDiv.data('report-date');
	var lastDivId = lastDiv.data('report-id');
	console.log(lastDivId);
	console.log(ff);
	loadNewUserReportAjax(output,ff,url,lastDiv,lastDivDate,lastDivId);
	}
}
/////////////////////////////////////////////////////////////////////////////////////////////	
function loadNewUserReportAjax(output,ff,url,lastDiv,lastDivDate,lastDivId){
	/*var uid;
	if($( "#getDetailThisUser" ).data( "otherUId") !== 'undifined'){
		uid = $( "#getDetailThisUser" ).data( "otherUId");
		}else{
			uid = localStorage.userId;
			}*/
	$.ajax({
		type: 'GET',
		url: url,
		contentType: "application/json",
		dataType: 'jsonp',
		data: { 
				userid: uid,
				userReportFlag: ff,
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
				if(uid === window.localStorage.userId){
				htmlReportUser(item);
			}else{
				htmlReport(item);
				}
				output.prepend(reportHtml);
			});
		}else{
			$("#pMsgUserReport").text('ฟีดข่าวล่าสุดแล้ว.').show().css("color", "green").fadeOut(3200);
			console.log(output.html());
			//output.empty();
			}
		},
		error: function(){
			console.log(output.html().length);
		   output.text('พบข้อผิดพลาดในการโหลดข้อมูล!!').show().css("color", "red").fadeOut(3200);
		}
	});
	}
	
/////////////////////////////////////////////////////////////////////////////////////////////	
function loadOldUserReport(){
	
	
	var output = $('#userReportBottom');	
	var ff = 'old';
	var url = serviceURL + 'loadUserReport.php';
	
	console.log(output.html().length);
///////////////////////////////////////////////////////////////////////////////////	
	if(output.html().length===0){
		var lastDiv = $('#userReportMiddle').children('div:last-child');
		var lastDivDate = lastDiv.data('report-date');
		var lastDivId = lastDiv.data('report-id');
		console.log(lastDivId);
		console.log(ff);
		loadOldUserReportAjax(output,ff,url,lastDiv,lastDivDate,lastDivId);
///////////////////////////////////////////////////////////////////////////////////	
	}else{
		
	var lastDiv = $('#userReportBottom').children('div:last-child');
	var lastDivDate = lastDiv.data('report-date');
	var lastDivId = lastDiv.data('report-id');
	console.log(lastDivId);
	console.log(ff);
	loadOldUserReportAjax(output,ff,url,lastDiv,lastDivDate,lastDivId);
	}
}

function loadOldUserReportAjax(output,ff,url,lastDiv,lastDivDate,lastDivId){
	/*var uid;
	if($( "#getDetailThisUser" ).data( "otherUId") !== 'undifined'){
		uid = $( "#getDetailThisUser" ).data( "otherUId");
		}else{
			uid = localStorage.userId;
			}*/
	$.ajax({
		type: 'GET',
		url: url,
		contentType: "application/json",
		dataType: 'jsonp',
		data: { 
				userid: uid,
				userReportFlag: ff,
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
			if(uid === window.localStorage.userId){
				htmlReportUser(item);
			}else{
				htmlReport(item);
				}
				output.append(reportHtml);
			});
		}else{
			$("#pMsgUserReportB").text('ฟีดข่าวเก่าสุดแล้ว.').show().css("color", "green").fadeOut(3200);
			console.log(output.html());
			//output.empty();
			}
		},
		error: function(){
			console.log(output.html().length);
		   output.text('พบข้อผิดพลาดในการโหลดข้อมูล!!').show().css("color", "red").fadeOut(3200);
		}
	});
	}
	
function htmlReportUser(item){
	var d = moment();
	var de = moment(item.report_date, 'YYYY-MM-DD HH:mm:ss', 'th');
	reportHtml = '<div class="ui-corner-all custom-corners" id="reportView" data-report-date="'+item.report_date+'" data-report-id="'+item.report_id+'" data-report-by="'+item.report_by+'"><a href="#otherProfilePage" class="ui-corner-all" id="lnkThisUpro" onClick="getOtherUserDetail(' + item.report_by + ')"><div class="ui-bar ui-bar-b"><h3><strong><span id="spNameFeed">' + item.report_realNameBy
				+ '</span></strong></h3></div></a><div class="ui-body ui-body-a"><div class="ui-grid-a">'
				 + '<div class="ui-block-a" id="miniPropicHome">' 
				 + '<img alt="" height="40" id="imgMiniPropicHome" src="'+serviceURL + "../img/userprofileimage/" + item.report_userImageUrl + "?" + d.format() + '" width="40">' 
				 + '</div><div class="ui-block-b" id="miniReportdetail">' 
				 + 'วันที่: <span id="spDateReport">' + de.format('DD MMMM YYYY')
				 + '</span><br>เวลา: <em><span id="spTimeReport">' + de.format('HH:mm:ss')
				 + '</span></em></div></div><div class="ui-grid-solo"><b>หัวเรื่อง:</b> <span id="spTitle">' + item.report_title
				 + '</span><br><b>รายละเอียด:</b> <em><span id="spContent">' + item.report_content
				 + '</span></em><br><br><a href="#fullImgPage" class="lnkThisImg" onClick="getFullImg('+ "'"+ item.report_imgUrl + "'"+')"><img align="center" alt="" id="imgReport" src="' +serviceURL + "../img/reportPic/" + item.report_imgUrl + "?" + d.format()
				 + '"></a><b>สถานที่:</b> <em><span id="spLocatReport">' + item.report_locat
				 + '</span></em><br><a href="#mapPage" id="lnkThisMap" data-ajax="false" onClick="showThisMap('+ item.report_lat + ", " + item.report_long +')"><img id="imgMapReport" src="http://maps.googleapis.com/maps/api/staticmap?center=' + item.report_lat + "," + item.report_long
				 + '&zoom=16&size=400x400&maptype=roadmap&markers=color:green%7C' + item.report_lat + "," + item.report_long
				 + '&sensor=true"></a>'
				 + '<div class="ui-grid-a"><div class="ui-block-a">'
				 + '<a class="ui-btn ui-mini ui-icon-refresh ui-btn-icon-left ui-corner-all activeOnce" href="#editReportPage" id="editUserReportBtn" data-transition="none" onClick="getEditReport('+"'"+ item.report_id +"', " +"'"+item.report_title + "', " +"'"+ encodeURI(item.report_content) +"'"+');">แก้ไข</a>'
            	 + '</div><div class="ui-block-b">'
				 + '<a class="ui-btn ui-mini ui-icon-refresh ui-btn-icon-left ui-corner-all activeOnce" href="#deleteReportDialog" id="delReportPopupBtn" data-rel="popup" data-position-to="window" data-transition="pop" onClick="setDelReportId(' +"'"+ item.report_id + "'"+')">ลบ</a>'
		   		 + '</div></div></div></div><br>';
	
	
	}
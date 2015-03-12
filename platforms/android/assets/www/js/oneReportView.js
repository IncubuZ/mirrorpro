function loadOneReport(rpid){
	clearCache();//
	loadingShow("#contentOneReport");
	var repid = rpid;
	var output = $('#oneReportDive');
	output.empty();
	var url = serviceURL + 'loadOneReport.php';
	$.ajax({
			type: 'GET',
			url: url,
			contentType: "application/json",
			dataType: 'jsonp',
			data: {
				reportid: repid
			},
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
			
			$.each(data, function(i,item){ 
			
				htmlReport(item);
				output.append(reportHtml);
				loadingHide("#contentOneReport");
			});
		},
		error: function(){
		   output.text('พบข้อผิดพลาดในการโหลดข้อมูล!!');
		   				loadingHide("#contentOneReport");

		}
	});
	
}
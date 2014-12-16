
function getUserDetail (){
		loadingShow("#contentProfile");
		$('#imgPropic').attr('src', serviceURL + "../img/" + localStorage.userImageUrl);
		$('#spNamePro').text(localStorage.userRName + ' ' + localStorage.userSurname);
		$('#spGenderPro').text(localStorage.userGender);
		$('#spBirthPro').text(localStorage.userBdate);
		$('#spEmailPro').text(localStorage.userEmail);
		loadingHide("#contentProfile");
}

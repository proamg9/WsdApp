$(document).ready(function(){
	$('.upload').click(function(){
		var files = $('input[type="file"]')[0].files[0];

		console.log(files);
		if(files)
		{
			var formdata = new FormData();
			formdata.append('file',files);
			$.ajax({
				url:'http://localhost:3000/upload',
				type:'post',
				data:formdata,
				contentType:false,
				processData:false,
				success:function(data){
					if(data.success)
					{
						toastr['success']('You have successfully uploaded image','Success');
					}
				}
			})
		}
		else
		{
			toastr['error']('Please select your photo','Error');
		}
	})

	toastr['success']('You have successfully Log in','Success');
})
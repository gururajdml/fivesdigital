var base_url = 'https://www.fivesdigital.com/';
$(document).ready(function() {
		$.ajaxSetup({
			headers: {
				//'X-CSRF-TOKEN': '{{ csrf_token() }}'
				  'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
			}
		});
		getHomeBlog();
		function getHomeBlog() {
		    if(typeof page_id === "undefined") {
				page_id = '';	
			}
			$.ajax({
				type:'POST',
				//url:'/home-blog',
				url: base_url+'/home-blog',
				data:{'blog':true,'page_id':page_id},
				success:function(data){
					$(".blog-data").html(data.html);
					$(".blog-data").slick({
            			dots: false,
            			arrows: true,
            			infinite: false,
            			autoplay: true,
            			speed: 300,
            			centerMode: false,
            			nextArrow: '<button type="button" class="slick-next"><img src="/front/public/assets/images/right-arrow.svg"></button>',
            			prevArrow: '<button type="button" class="slick-prev"><img src="/front/public/assets/images/left-arrow.svg"></button>',
            			slidesToShow: 3,
            			slidesToScroll: 1,
            		 	responsive: [
            				 {breakpoint: 1200, settings: {slidesToShow: 2}},
            				 {breakpoint: 600, settings: {slidesToShow: 1}},
            		 	]
        		    });
        		    $('.likebtn').on("click",function(){
                		var id = $(this).data('id');
                		$.ajax({
                			type:'POST',
                			url: base_url+'/blog-like',
                			data:{'id':id},
                			success:function(data){
                				if(data.blog_like_count != '') {
                					$('.blog_like_count_'+id).text(data.blog_like_count);
                					$('.fa-heart-o-'+id).removeClass('fa-heart-o').addClass('fa-heart');
                					$('span.blog_like_count_'+id).removeAttr('class');
                				}
                			} 
                		});
                	});	
                	$(".sharebtn").on("click",function(){
                		var id = $(this).data('id');
                		$("#share_btns_"+id).slideToggle();
                	});
				} 
			});
		}
		
		getHomeCaseStudy();
		function getHomeCaseStudy() {
		    if(typeof page_id === "undefined") {
				page_id = '';	
			}
			$.ajax({
				type:'POST',
				//url:'/home-blog',
				url: base_url+'/home-case-study',
				data:{'case_study':true,'page_id':page_id},
				success:function(data){
					$(".case-study-data").html(data.html);
				} 
			});
		}
	$("#btnContactUsSubmit").on("click",function(e){
	    
		e.preventDefault();
		$("#btnContactUsSubmit").prop("disabled",true);
		var inquiry_type = $('.inquiry_type').val();
		if(inquiry_type == 'Recruitment') {
			$('#btnContactUsSubmit').html('<span></span> Submit <i class="fa fa-circle-o-notch fa-spin" style="font-size:15px"></i>');
		} else {
			$('#btnContactUsSubmit').html('<span></span> Hear from Expert <i class="fa fa-circle-o-notch fa-spin" style="font-size:15px"></i>');
		}
		var formData = new FormData();
		if($('.inquiry_type').val() == 'Recruitment') {
			var cv_upload = ($('#cv_upload')[0].files[0] != undefined) ?  $('#cv_upload')[0].files[0] : '';
		} else {
			var cv_upload = '';
		}
		formData.append('cv_upload', cv_upload);
		var other_data = $('#frmContactUs').serializeArray();
		$.each(other_data,function(key,input){
			formData.append(input.name,input.value);
		});
		//var cv_upload = $('#cv_upload')[0].files[0];
		//var data =  data + '&cv_upload=' + cv_upload;
		$.ajax({
			type:'POST',
			//url:'/inquiry',
			url: base_url+'/inquiry',
			//data:$("#frmContactUs").serialize(),
			data:formData,
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			contentType: false,
			cache: false,
			processData:false,
			success:function(data){
				$("#frmContactUs .help-block").html('');
				if(data.validation_error_responce){
					$("#btnContactUsSubmit").prop("disabled",false);
					if(inquiry_type == 'Recruitment') {
						$('#btnContactUsSubmit').html('<span></span> Submit');
					} else {
						$('#btnContactUsSubmit').html('<span></span> Hear from Expert');
					}
					$.each(data.validation_error_responce,function(key,val){
						$.each(val,function(k,v){
							$("#frmContactUs .error_"+key).html(v);
						});
					});
					} else {
					window.location = data.redirect;
					/*$(".ajaxResponse").append("<div class='text-"+data.r+"'>"+data.msg+"</div>");
					$('#frmContactUs')[0].reset();
					$("#btnContactUsSubmit").prop("disabled",false);
					$('#btnContactUsSubmit').html('<span></span> Hear from Expert');
					$( ".contact-form .inquiry_type" ).trigger( "change" );
					setTimeout(function(){ $(".ajaxResponse").html(''); }, 2000);*/
					
				}
			} 
		}); 
	});
	/*$("#btn_quick_inquiry").on("click",function(e){
    	e.preventDefault();
		$("#btn_quick_inquiry").prop("disabled",true);
		$('#btn_quick_inquiry').html('<span></span> Send Inquiry <i class="fa fa-circle-o-notch fa-spin" style="font-size:15px"></i>');
		$.ajax({
			type:'POST',
			//url: '/quick-inquiry',
			url: base_url+'/quick-inquiry',
			data:$("#frmQuickInquiry").serialize(),
			success:function(data){
			    $("#frmQuickInquiry .help-block").html('');
			    if(data.validation_error_responce){
    				$("#btn_quick_inquiry").prop("disabled",false);
    				$('#btn_quick_inquiry').html('<span></span> Send Inquiry');
    				$.each(data.validation_error_responce,function(key,val){
    					$.each(val,function(k,v){
    						//$("#frmContactUs :input[name='"+key+"']").parent().addClass("has-error");
    						//$("#frmContactUs :input[name='"+key+"']").parent().find('span').html(v);
    						$("#frmQuickInquiry .error_"+key).html(v);
    					});
    				});
    			} else {
    			    $('.ajaxResponse').html('');
					$(".ajaxResponse").append("<div class='text-"+data.r+"'>"+data.msg+"</div>");
					$('#frmQuickInquiry')[0].reset();
					$("#btn_quick_inquiry").prop("disabled",false);
					$('#btn_quick_inquiry').html('<span></span> Submit');
					setTimeout(function(){ window.location.reload(); }, 2000);
    			}
			} 
		}); 
	});*/
	
	$("#btn_quick_inquiry").on("click",function(e){
    	e.preventDefault();
		$("#btn_quick_inquiry").prop("disabled",true);
		$('#btn_quick_inquiry').html('<span></span> Here From Expert <i class="fa fa-circle-o-notch fa-spin" style="font-size: 13px;position: absolute;right: 25px;margin-top: 5px;"></i>');
		$.ajax({
			type:'POST',
			//url: '/quick-inquiry',
			url: base_url+'/quick-inquiry',
			data:$("#frmQuickInquiry").serialize(),
			success:function(data){
			    $("#frmQuickInquiry .help-block").html('');
			    $("#frmQuickInquiry .help-block").addClass('hide');
			    if(data.validation_error_responce){
    				$("#btn_quick_inquiry").prop("disabled",false);
    				$('#btn_quick_inquiry').html('<span></span> Here From Expert');
    				$.each(data.validation_error_responce,function(key,val){
    					$.each(val,function(k,v){
    						//$("#frmContactUs :input[name='"+key+"']").parent().addClass("has-error");
    						//$("#frmContactUs :input[name='"+key+"']").parent().find('span').html(v);
    						$("#frmQuickInquiry .error_"+key).removeClass('hide');
    						$("#frmQuickInquiry .error_"+key).html(v);
    					});
    				});
    			} else {
    			    $('.ajaxResponse').html('');
					$(".ajaxResponse").append("<div class='text-white'>"+data.msg+"</div>");
					$('#frmQuickInquiry')[0].reset();
					$("#btn_quick_inquiry").prop("disabled",false);
					$('#btn_quick_inquiry').html('<span></span> Here From Expert');
					setTimeout(function(){ window.location.reload(); }, 2000);
    			}
			} 
		}); 
	});
	
	$("#btn_send_proposal").on("click",function(e){
    	e.preventDefault();
		$("#btn_send_proposal").prop("disabled",true);
		$('#btn_send_proposal').html('<span></span> Send Me Proposal <i class="fa fa-circle-o-notch fa-spin" style="font-size:15px"></i>');
		$.ajax({
			type:'POST',
			//url: '/quick-inquiry',
			url: base_url+'/send-proposal',
			data:$("#frmSendProposal").serialize(),
			success:function(data){
			    $("#frmSendProposal .help-block").html('');
			    if(data.validation_error_responce){
    				$("#btn_send_proposal").prop("disabled",false);
    				$('#btn_send_proposal').html('<span></span> Send Me Proposal');
    				$.each(data.validation_error_responce,function(key,val){
    					$.each(val,function(k,v){
							$("#frmSendProposal .help-block").removeClass('bg-success msg-send-proposal');
							$("#frmSendProposal .help-block").addClass('help-wato-p');
    						$("#frmSendProposal .error_"+key).html(v);
    					});
    				});
    			} else {
    			    $('.ajaxResponse').html('');
					//$(".ajaxResponse").append("<div class='text-"+data.r+"'>"+data.msg+"</div>");
					$("#frmSendProposal .help-block").addClass('help-wato-p bg-success msg-send-proposal');
					$("#frmSendProposal .error_email").html(data.msg);
					$('#frmSendProposal')[0].reset();
					$("#btn_send_proposal").prop("disabled",false);
					$('#btn_send_proposal').html('<span></span> Send Me Proposal');
					setTimeout(function(){ window.location.reload(); }, 3000);
    			}
			} 
		}); 
	});
	
	$("#btn_request_call").on("click",function(e){
    	e.preventDefault();
		$("#btn_request_call").prop("disabled",true);
		$('#btn_request_call').html('<span></span> Request a Call <i class="fa fa-circle-o-notch fa-spin" style="font-size:15px"></i>');
		$.ajax({
			type:'POST',
			//url: '/quick-inquiry',
			url: base_url+'/request-call',
			data:$("#frmRequestCall").serialize(),
			success:function(data){
			    $("#frmRequestCall .help-block").html('');
			    if(data.validation_error_responce){
    				$("#btn_request_call").prop("disabled",false);
    				$('#btn_request_call').html('<span></span> Request a Call');
    				$.each(data.validation_error_responce,function(key,val){
    					$.each(val,function(k,v){
							$("#frmRequestCall .help-block").removeClass('bg-success msg-request-call');
							$("#frmRequestCall .help-block").addClass('help-wato-p');
    						$("#frmRequestCall .error_"+key).html(v);
    					});
    				});
    			} else {
    			    $('.ajaxResponse').html('');
					//$(".ajaxResponse").append("<div class='text-"+data.r+"'>"+data.msg+"</div>");
					$("#frmRequestCall .help-block").addClass('help-wato-p bg-success msg-request-call');
					$("#frmRequestCall .error_mobile").html(data.msg);
					$('#frmRequestCall')[0].reset();
					$("#btn_request_call").prop("disabled",false);
					$('#btn_request_call').html('<span></span> Request a Call');
					setTimeout(function(){ window.location.reload(); }, 2000);
    			}
			} 
		}); 
	});
	
	$("#btn-case-study-inquiry").on("click",function(e){
		e.preventDefault();
		$('#btn-case-study-inquiry').html('<span></span> Submit <i class="fa fa-circle-o-notch fa-spin" style="font-size:15px"></i>');
		$.ajax({
			type:'POST',
			//url: '/case-study-inquiry',
			url: base_url+'/case-study-inquiry',
			data:$("#frm-case-study-inquiry").serialize(),
			success:function(data){
				$("#frm-case-study-inquiry .help-block").html('');
				if(data.validation_error_responce){
					$('#btn-case-study-inquiry').html('<span></span> Submit');
					$.each(data.validation_error_responce,function(key,val){
						$.each(val,function(k,v){
							$("#frm-case-study-inquiry .error_"+key).html(v);
						});
					});
				} else {
					$('#frm-case-study-inquiry')[0].reset();
					$('#btn_case-study-inquiry').html('<span></span> Submit');
					$('#case_form').modal('hide');
					$('div#blured').removeAttr('id');
				}
			} 
		}); 
	});
	
	$('.case_industry,.case_category').on("change",function(){
		var industry = $('.case_industry').val();
		var category = $('.case_category').val();
		$.ajax({
			type:'POST',
			url: base_url+'/case-study-filter',
			data:{'industry':industry,'category':category},
			success:function(data){
				$(".case_filter_data").html(data.html);
			} 
		});
	});
	
	$('.likebtn').on("click",function(){
		var id = $(this).data('id');
		$.ajax({
			type:'POST',
			url: base_url+'/blog-like',
			data:{'id':id},
			success:function(data){
				if(data.blog_like_count != '') {
					$('.blog_like_count_'+id).text(data.blog_like_count);
					$('.fa-heart-o-'+id).removeClass('fa-heart-o').addClass('fa-heart');
					$('span.blog_like_count_'+id).removeAttr('class');
				}
			} 
		});
	});
	$(".sharebtn").on("click",function(){
		var id = $(this).data('id');
		$("#share_btns_"+id).slideToggle();
	});
	
	$(".cmtbtn").on("click",function () {
	$('#frmCommentBlog #blog_id').val($(this).data('blog_id'))
		$("#comment_pop").modal('show');
	});
	
	$("#btn_blog_comment").on("click",function(e){
    	e.preventDefault();
		$("#btn_blog_comment").prop("disabled",true);
		$('#btn_blog_comment').html('<span></span> Submit <i class="fa fa-circle-o-notch fa-spin" style="font-size:15px"></i>');
		$.ajax({
			type:'POST',
			url: base_url+'/blog-comment',
			data:$("#frmCommentBlog").serialize(),
			success:function(data){
			    $("#frmCommentBlog .help-block").html('');
			    if(data.validation_error_responce){
    				$("#btn_blog_comment").prop("disabled",false);
    				$('#btn_blog_comment').html('<span></span> Submit');
    				$.each(data.validation_error_responce,function(key,val){
    					$.each(val,function(k,v){
    						$("#frmCommentBlog .error_"+key).html(v);
    					});
    				});
    			} else {
    			    $('#frmCommentBlog .ajaxResponse').html('');
					$("#frmCommentBlog .ajaxResponse").append("<div class='text-"+data.r+"'>"+data.msg+"</div>");
					$('#frmCommentBlog')[0].reset();
					$("#btn_blog_comment").prop("disabled",false);
					$('#btn_blog_comment').html('Submit');
					setTimeout(function(){ window.location.reload(); }, 2000);
    			}
			} 
		});
	});
	$("#btn_job_opening").on("click",function(e){
    	e.preventDefault();
		$("#btn_job_opening").prop("disabled",true);
		$('#btn_job_opening').html('Apply <i class="fa fa-circle-o-notch fa-spin" style="font-size:15px"></i>');
		$.ajax({
			type:'POST',
			url: base_url+'/career-data',
			data:$("#frmJobOpening").serialize(),
			success:function(data){
			    $("#frmJobOpening .help-block").html('');
			    if(data.code == '400'){
					$('.job-opening-data .help-block').html('');
    				$("#btn_job_opening").prop("disabled",false);
    				$('#btn_job_opening').html('Apply');
					$("#frmJobOpening .help-block").html(data.msg);
    			} else {
					$("#btn_job_opening").prop("disabled",false);
    				$('#btn_job_opening').html('Apply');
					$('.job-opening-data').html(data.html);
				}
			}	
		}); 
	});
	$("#btn_event_inquiry").on("click",function(e){
    	e.preventDefault();
		$("#btn_event_inquiry").prop("disabled",true);
		$('#btn_event_inquiry').html('<span></span> Register Now <i class="fa fa-circle-o-notch fa-spin" style="font-size:15px"></i>');
		$.ajax({
			type:'POST',
			url: base_url+'/coffee-chat-inquiry',
			data:$("#frmEventInquiry").serialize(),
			success:function(data){
			    $("#frmEventInquiry .help-block").html('');
			    if(data.validation_error_responce){
    				$("#btn_event_inquiry").prop("disabled",false);
    				$('#btn_event_inquiry').html('<span></span> Register Now');
    				$.each(data.validation_error_responce,function(key,val){
    					$.each(val,function(k,v){
    						$("#frmEventInquiry .error_"+key).html(v);
    					});
    				});
    			} else {
    			    $('.ajaxResponse').html('');
    			    $('.ajaxResponse').addClass('msg-event-inquiry');
					$(".ajaxResponse").append("<div class='text-"+data.r+"'>"+data.msg+"</div>");
					$('#frmEventInquiry')[0].reset();
					$("#btn_event_inquiry").prop("disabled",false);
					$('#btn_event_inquiry').html('<span></span> Register Now');
					setTimeout(function(){ window.location.reload(); }, 2000);
    			}
			} 
		}); 
	});
	$(".job_apply").on("click",function () {
		$('#frmApplyJob #designation').val($(this).data('designation'))
		$('#frmApplyJob #job_opening_id').val($(this).data('id'))
		$("#apply_job_modal").modal('show');
	});
	$("#btn_apply_job").on("click",function(e){
		e.preventDefault();
		$("#btn_apply_job").prop("disabled",true);
		$("#btn_apply_job").html('<span></span> Submit <i class="fa fa-circle-o-notch fa-spin" style="font-size:15px"></i>');
		var formData = new FormData();
		var cv_upload = ($('#cv_upload')[0].files[0] != undefined) ?  $('#cv_upload')[0].files[0] : '';
		formData.append('cv_upload', cv_upload);
		var other_data = $('#frmApplyJob').serializeArray();
		$.each(other_data,function(key,input){
			formData.append(input.name,input.value);
		});
		$.ajax({
			type:'POST',
			//url:'/inquiry',
			url: base_url+'/apply-job',
			data:formData,
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			contentType: false,
			cache: false,
			processData:false,
			success:function(data){
				$("#frmApplyJob .help-block").html('');
				if(data.validation_error_responce){
					$("#btn_apply_job").prop("disabled",false);
					$('#btn_apply_job').html('<span></span> Submit');
					$.each(data.validation_error_responce,function(key,val){
						$.each(val,function(k,v){
							$("#frmApplyJob .error_"+key).html(v);
						});
					});
				} else {
					//window.location = data.redirect;
					$('#frmApplyJob .custom-file-label').html('Upload CV (only pdf,doc)');
					$('#frmApplyJob')[0].reset();
					$("#frmApplyJob").prop("disabled",false);
					$('#btn_apply_job').html('<span></span> Submit');
					$(".ajaxResponse").append("<div class='text-"+data.r+"'>"+data.msg+"</div>");
				}
			} 
		}); 
	});
});

$('input[name="mobile"]').on("keypress",function(e){
    if ( e.keyCode == 46 || e.keyCode == 8 || e.keyCode == 43) {
        return true;    
    }else {
        if (e.keyCode >= 48 && e.keyCode <= 57 ) {
            return true;
        }
    } 
    
    // e.preventDefault();
    return false;
});
$('body').on('change','.contact-form .inquiry_type',function(){
	var inquiry_type = $(this).val();
	if(inquiry_type == 'Sales_And_Solutions' || inquiry_type == 'Partnership') {
		$('.contact-form .career_div').addClass('hide');
		$('.contact-form .sales_div').removeClass('hide');
		$('#btnContactUsSubmit').html('<span></span> Hear from Expert');
	} else if(inquiry_type == 'Recruitment'){
		$('.contact-form .sales_div').addClass('hide');
		$('.contact-form .career_div').removeClass('hide');
		$('#btnContactUsSubmit').html('<span></span> Submit');
	} else {
		$('.contact-form .sales_div').addClass('hide');
		$('.contact-form .career_div').addClass('hide');
		$('#btnContactUsSubmit').html('<span></span> Hear from Expert');
	}
});
$('#cv_upload').on('change',function(){
	var fileName = $(this).val();
	$(this).next('.custom-file-label').html(fileName);
});
function push_notification () { 
	
	
	var service_worker = null;
	var permission = null;


	/********/
	
	
	this.register_notification = function (service_script) {
		
		window.Notification.requestPermission (async function (permission) {
			
			navigator.serviceWorker.onmessage = function (event) {
				
//				alert (event.data);
				alert ("this here");
				
			}// onmessage;
			

			if (permission.equals ("granted")) service_worker = await navigator.serviceWorker.register (service_script).then (function (service_worker) {
				alert ("starting");
				alert (service_worker.pushManager);
				service_worker.pushManager.getSubscription ().then (function (subscription) {
					
					alert (subscription);
					alert (is_null (subscription));
					
					if (is_null (subscription)) service_worker.pushManager ().subscribe ().then (function () { alert ("done"); });
				});
			});
			
		});
		
	}// register_notification;
	
	
	this.save_subscription = function () {
		
		navigator.serviceWorker.ready.then (function (registration) {
			
			registration.pushManager.getSubscription ().then (function (subscription) {
				
				jQuery.ajax ({
					
					data: { 
						action: "push",
						option: "save",
						value: json_encode (subscription)
					}/* data */,
					
					success: function (response) {
						alert (response.trim ());
					}/* success */
					
				});
				
			});
		});
		
	}// save_subscription;
	
	
	this.show_token = function () {

		navigator.serviceWorker.ready.then (function (registration) {

			registration.pushManager.getSubscription ().then (function (subscription) {

				alert (subscription);

			});
			
		});
		
	}// show_token;


	
	
	this.broadcast = function (message) {
		
		jQuery.ajax ({
			
			data: { 
				action: "push",
				option: "broadcast",
				data: message
			}/* data */,
			
			success: function (response) {
				alert (response.trim ());
			}/* success */
			
		});

	}// broadcast;
	
	
}// push_notification;


/********/


	

function push_capable () {
	return (("serviceWorker" in navigator) && ("PushManager" in window)); 
}// push_capable;




















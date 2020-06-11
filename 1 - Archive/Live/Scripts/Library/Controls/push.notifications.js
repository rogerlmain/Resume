const firebaseConfig = {
  apiKey: "AIzaSyDagrF-R213t6TuDFCu2mKsb1cBxRKCxAY",
  authDomain: "rexs-chatroom.firebaseapp.com",
  databaseURL: "https://rexs-chatroom.firebaseio.com",
  projectId: "rexs-chatroom",
  storageBucket: "rexs-chatroom.appspot.com",
  messagingSenderId: "415730163769",
  appId: "1:415730163769:web:39f2ceb67c468e09"
};


function push_notification () { 

	let server_key = "BINlYd-sYDib0CbImpMRI0k8ADiASDe_57_YLkwr5PBkx4rKiwhn4SS4EJYZ3qCLK9rkp6tZAyFQY9JCAyir2pw";
	
	
	let service_worker = null;
	let permission = null;


	function process_token (command) {
		navigator.serviceWorker.ready.then (function (registration) {

			registration.pushManager.getSubscription ().then (function (subscription) {

				command (subscription);

			});
			
		});
	}// process_token;
	
	
	function decoded_token (base64String) {
		const padding = '='.repeat ((4 - base64String.length % 4) % 4);
		const base64 = (base64String + padding).replace (/\-/g, '+').replace (/_/g, '/');
		const raw_data = window.atob (base64);
		const output = new Uint8Array (raw_data.length);
		for (let i = 0; i < raw_data.length; ++i) {
			output [i] = raw_data.charCodeAt (i);
		}// for;
		return output;
	}// decoded_token;


	/********/
	
	
	this.register_notification = function (service_script) {
		
		window.Notification.requestPermission (async function (permission) {
			
			if (permission.equals ("granted")) service_worker = await navigator.serviceWorker.register (service_script).then (function (service_worker) {
				
				service_worker.pushManager.getSubscription ().then (function (subscription) {
					
					if (is_null (subscription)) service_worker.pushManager.subscribe ({
						userVisibleOnly: true,
						applicationServerKey: decoded_token (server_key)
					});
						
				});
				
			});
			
		});
		
	}// register_notification;
	
	
	this.save_subscription = function () {
		
		process_token (function (subscription) {
			
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
		
	}// save_subscription;
	
	
	this.show_token = function () {
		
		process_token (function (subscription) {
			
			alert (json_encode (subscription));
			
		});

	}// show_token;
	
	
	this.broadcast = function (message) {
		
		process_token (function (subscription) {

			jQuery.ajax ({
				
				data: { 
					action: "push",
					option: "broadcast",
					message: message,
					token: json_encode (subscription) 
				}/* data */,
				
				success: function (response) {
					
					alert (response.trim ());
					
				}/* success */
				
			});
			
		});

	}// broadcast;
	
	
}// push_notification;


/********/


function push_capable () {
	return (("serviceWorker" in navigator) && ("PushManager" in window)); 
}// push_capable;




















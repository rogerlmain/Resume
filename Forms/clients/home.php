<flash-card onload="equalize ($('#client_image'), $('#client_blurb'));">


	<popup-panel id="clients_tip" class="starburst" easing="bounce" delay="4" style="left: 21%; top: 30%; transform: rotate(-15deg);" onclose="arm_popup ($('#links_tip'));">
		
		<contents>
			<div class="header">Did you know?</div>
			<div class="contents">Rex has worked in a variety of industries including media, energy and finance!</div>
		</contents>
			
	</popup-panel>


	<popup-panel id="links_tip" class="starburst" easing="bounce" delay="4" style="left: 52%; top: 67%; transform: rotate(7deg);">
		
		<contents>
			<div class="header">Did you know?</div>
			<div class="contents">These are clickable links which will tell you more about the jobs Rex has done!</div>
		</contents>
			
	</popup-panel>
	

	<sweep-panel id="client_image" class="sweep-image" visible="false" direction="right,up">
		<div class="title">Clients</div>
		<img src="Images/road.png" style="width: auto; height: 50vh;" />
	</sweep-panel>
	

	<sweep-panel id="client_blurb" class="sweep-blurb" visible="false" direction="left,down" onenter="$(this).children ('fade-list').dom_object.run (function () {
		arm_popup ($('#clients_tip').dom_object, 6);
	});">
	

		<fade-list speed="150">
		
			<ul id="client_list">
			
				<li>
					<fade-item onclick="new dialog_window ({ 
						eyecandy: 'Loading...',
						action: 'clients',
						option: 'lb_media',
						buttons: [dialog_buttons.close]
					}).show (event);">LB Media Inc.</fade-item>
				</li>
				
				
				<li>
					<fade-item onclick="new dialog_window ({ 
						eyecandy: 'Loading...',
						action: 'clients',
						option: 'ecosystems',
						buttons: [dialog_buttons.close]
					}).show (event);">Planet Ecosystems LLC / Franklin Energy</fade-item>
				</li>
				
					
				<li>
					<fade-item onclick="new dialog_window ({ 
						eyecandy: 'Loading...',
						action: 'clients',
						option: 'doi',
						buttons: [dialog_buttons.close]
					}).show (event);">United States Department of the Interior</fade-item>
				</li>
				
					
				<li>
					<fade-item onclick="new dialog_window ({ 
						eyecandy: 'Loading...',
						action: 'clients',
						option: 'fimac',
						buttons: [dialog_buttons.close]
					}).show (event);">FIMAC Solutions</fade-item>
				</li>
				
					
				<li>
					<fade-item onclick="new dialog_window ({ 
						eyecandy: 'Loading...',
						action: 'clients',
						option: 'aspire',
						buttons: [dialog_buttons.close]
					}).show (event);">Aspire Financial Services</fade-item>
				</li>
				
					
				<li>
					<fade-item onclick="new dialog_window ({ 
						eyecandy: 'Loading...',
						action: 'clients',
						option: 'ghx',
						buttons: [dialog_buttons.close]
					}).show (event);">Global Healthcare Exchange</fade-item>
				</li>
				
					
				<li>
					<fade-item onclick="new dialog_window ({ 
						eyecandy: 'Loading...',
						action: 'clients',
						option: 'kinder',
						buttons: [dialog_buttons.close]
					}).show (event);">Kinder Morgan</fade-item>
				</li>
				
					
				<li>
					<fade-item onclick="new dialog_window ({ 
						eyecandy: 'Loading...',
						action: 'clients',
						option: 'capiq',
						buttons: [dialog_buttons.close]
					}).show (event);">Capital IQ</fade-item>
				</li>
				
					
				<li>
					<fade-item onclick="new dialog_window ({ 
						eyecandy: 'Loading...',
						action: 'clients',
						option: 'oncommand',
						buttons: [dialog_buttons.close]
					}).show (event);">OnCommand Corporation</fade-item>
				</li>
				
					
				<li>
					<fade-item onclick="new dialog_window ({ 
						eyecandy: 'Loading...',
						action: 'clients',
						option: 'eagle',
						buttons: [dialog_buttons.close]
					}).show (event);">Eagle:XM</fade-item>
				</li>
				
					
				<li>
					<fade-item onclick="new dialog_window ({ 
						eyecandy: 'Loading...',
						action: 'clients',
						option: 'partminer',
						buttons: [dialog_buttons.close]
					}).show (event);">PartMiner Incorporated (An IHS Company)</fade-item> 
				</li>
				
					
				<li>
					<fade-item onclick="new dialog_window ({ 
						eyecandy: 'Loading...',
						action: 'clients',
						option: 'nexdata',
						buttons: [dialog_buttons.close]
					}).show (event);">NexData Solutions (An IHS Company)</fade-item>
				</li>
				
					
				<li>
					<fade-item onclick="new dialog_window ({ 
						eyecandy: 'Loading...',
						action: 'clients',
						option: 'internetau',
						buttons: [dialog_buttons.close]
					}).show (event);">Internet.au Magazine</fade-item>
				</li>
				
					
				<li>
					<fade-item onclick="new dialog_window ({ 
						eyecandy: 'Loading...',
						action: 'clients',
						option: 'ninemsn',
						buttons: [dialog_buttons.close]
					}).show (event);">Ninemsn Pty Ltd (A Microsoft Company)</fade-item>
				</li>
				
					
				<li>
					<fade-item onclick="new dialog_window ({ 
						eyecandy: 'Loading...',
						action: 'clients',
						option: 'widget',
						buttons: [dialog_buttons.close]
					}).show (event);">Widget Incorporated</fade-item>
				</li>
				
			</ul>
			
		</fade-list>
	
	</sweep-panel>
	
</flash-card>

<flash-card onload="equalize ($('#technical_image'), $('#technical_blurb'));">

	<popup-panel id="history_tip" class="starburst" easing="bounce" delay="5" style="left: 70%; top: 55%; transform: rotate(8deg);" onclose="arm_popup ($('#technical_tip'), 1.5);">
		
		<contents>
			<div class="header">Did you know?</div>
			<div class="contents">Most of Rex's family are in the computer business. His father was one of the pioneers of computers!</div>
		</contents>
			
	</popup-panel>


	<popup-panel id="technical_tip" class="starburst" easing="bounce" delay="4" style="left: 37%; top: 63%; z-index: 2; transform: rotate(-5deg);">
		
		<contents>
			<div class="header">Did you know?</div>
			<div class="contents">Some of the data on this site is being served from a MySql database!</div>
		</contents>
			
	</popup-panel>


	<sweep-panel id="technical_image" class="sweep-image" visible="false" direction="right,up">
		<div class="title">Development</div>
		<img src="Images/v2.png" style="width: auto; height: 35vh;" />
	</sweep-panel>

	
	<sweep-panel id="technical_blurb" class="sweep-blurb" visible="false" direction="left,down" onenter="$(this).children ('fade-list').dom_object.run (function () {
		arm_popup ($('#history_tip').dom_object);
	});">
		
		<fade-list>

			<fade-item>			
				In the course of my career I have worked, and consider myself proficient with<br />
				the following technologies:<br />
			</fade-item>
			
			<br />
			
			<ul class="naked-list">
			
				<fade-item>
					<li>
					
						<subtitle>Languages</subtitle>
		
						<ul class="root-list indented-list">		 	
							<li>C# / VB.NET / ASP.NET &dash; 2.0, 3.5, 4.0, 4.5 Framework (2006 &dash; 2015)</li>
							<li>PHP 5.3 (2011 &dash; Present)</li>
							<li>CodeIgniter / FuelPHP 1.7.3 (2015 &dash; 2016 / 2018)</li>
							<li>HTML / XHTML / HTML5 (1995 &dash; Present)</li>
							<li>CSS / CSS3 (1998 &dash; Present)</li>
							<li>JavaScript / Jscript / Node.js (1995 &dash; Present / 2016)</li>
							<li>Java / JSP / J2EE (2000 &dash; 2002), JDK 8.0 (2015 &dash; Present)</li>
							<li>jQuery 1.11 / 3.0.0 (2015 &dash; Present)</li>
							<li>XML (2003 &dash; 2006)</li>
							<li>JSON (2012 &dash; Present)</li>
						</ul>
						
					</li>
				</fade-item>
		
		
				<fade-item>
					<li>

						<subtitle>Databases</subtitle>
						
						<ul class="root-list indented-list">		 	
							<li>MS SQL Server 2005 / 2008</li>
							<li>MySql 5.0</li>
							<li>Sybase SQL Anywhere</li>
							<li>Oracle 8i / 10g</li>
							<li>MS Access</li>
							<li>PostgresSQL 9.2</li>
							<li>Cassandra 3.6</li>
						</ul>

					</li>
				</fade-item>
		
		
				<fade-item>
					<li>

						<subtitle>Operating Systems</subtitle>
					
						<ul class="root-list indented-list">		 	
							<li>Microsoft Windows (all versions)</li>
							<li>MSDos</li>
							<li>Unix / Linux</li>
							<li>Apple OSX</li>
							<li>VAX / Alpha VMS</li>
						</ul>
						
					</li>
				</fade-item>
		
		
				<fade-item>
					<li>

						<subtitle>Other Software and Concepts</subtitle>
					
						<ul class="root-list indented-list">		 	
							<li>IIS / Apache / Tomcat</li> 
							<li>Amazon Web Services</li>
							<li>OOP / OOD</li>
						</ul>

					</li>
				</fade-item>
				
			</ul>
			
		</fade-list>
		
	</sweep-panel>

</flash-card>



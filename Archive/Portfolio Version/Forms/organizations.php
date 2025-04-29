<style>

	fade-item li {
		padding-left: 2.5em;
		list-style-position: inside; 
	}/* fade-item li */ 

	fade-item li.paragraph {
		list-style-position: outside;
		list-style-type: none;
		padding: 1em 0;
	}/* fade-item li.paragraph */
		

popup-panel.starburst a {
	color: black;
	font-size: 11pt;
	font-family: var(--script);
	font-style: normal;
	text-decoration: none;
}/* popup-panel.starburst a */


popup-panel.starburst a:hover {
	text-decoration: underline;
}/* popup-panel.starburst a */

</style>


<flash-card onload="equalize ($('#organization_image'), $('#organization_blurb'));">


	<popup-panel id="organization_tip" class="starburst" easing="bounce" delay="5" style="left: 27%; top: 23%; transform: rotate(-12deg);" onclose="arm_popup ($('#link_tip'));">
		<contents>
			<div class="header">Did you know?</div>
			<div class="contents">Rex is an accomplished public speaker having been a member of Toastmasters International since 1990!</div>
		</contents>
			
	</popup-panel>


	<popup-panel id="link_tip" class="starburst" easing="bounce" style="left: 55%; top: 9%; transform: rotate(14deg);">

		<contents>
			<div class="contents">You can see more of what Rex is up to by going to</div>
			<div class="footer"><a href="http://www.rexthestrange.com" target="www.rexthestrange.com">www.rexthestrange.com</a></div>
		</contents>
			
	</popup-panel>


	<sweep-panel id="organization_image" class="sweep-image" visible="false" direction="right,up">
		<div class="title">Organizations</div>
		<img src="Images/statue.png" style="width: auto; height: 25vh;" />
	</sweep-panel>
	
	
	<sweep-panel id="organization_blurb" class="sweep-blurb" visible="false" direction="left,down" onenter="$(this).children ('fade-list').dom_object.run (function () {
		arm_popup ($('#organization_tip').dom_object);
	});">
	
		<fade-list speed="150">
			<ul>						
 
				<fade-item>
					<li class="paragraph">1990 &dash; 2016 Member of Toastmasters International</li>
				</fade-item>			

				<fade-item>
					<li>Area Governor &dash; Area D3, Denver Division</li>
				</fade-item>			
				<fade-item>
					<li>Twice President of LoDo Toastmasters Club</li>
				</fade-item>			
				<fade-item>
					<li>Former President of North Sydney Achievers Toastmasters Club</li>
				</fade-item>			
				<fade-item>
					<li>Competent Toastmaster Award recipient</li>
				</fade-item>			
				<fade-item>
					<li>Certified Toastmaster Award recipient</li>
				</fade-item>
				<fade-item>
					<li>Advanced Toastmaster (Bronze) Award recipient</li>
				</fade-item>			
			
				<fade-item>
					<li class="paragraph">2019 &dash; Member Phi Theta Kappa Honor Society</li>
				</fade-item>
						
			</ul>
			
		</fade-list>
	
	</sweep-panel>
	

</flash-card>
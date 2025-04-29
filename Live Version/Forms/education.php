<flash-card onload="equalize ($('#education_image'), $('#education_blurb'));">

	<popup-panel id="education_tip" class="starburst" easing="bounce" ddelay="10" style="left: 38%; top: 52%; transform: rotate(-8deg);">
		
		<contents>
			<div class="header">Did you know?</div>
			<div class="contents">Rex majored in English and Ancient History and was a high school teacher before starting his career in programming.</div>
		</contents>
			
	</popup-panel>


	<sweep-panel id="education_image" class="sweep-image" visible="false" direction="right,up">
		<div class="title">Education</div>
		<img src="Images/sunset.png" style="width: 100%; height: auto;" />
	</sweep-panel>
	
	
	<sweep-panel id="education_blurb" class="sweep-blurb" visible="false" direction="left,down" onenter="$(this).children ('fade-list').dom_object.run (function () {
		arm_popup ($('#education_tip').dom_object, 2);
	});">
	
		<blockquote>
			I continue to strive to acquire additional skills and knowledge &dash; I believe that one's education is never finished &dash; and as such am currently working towards my second degree. 
			Most of my computer knowledge has been accumulated "on the job" but for managerial success I have found that more formal training is required. My interest in psychology is mainly 
			recreational, however, in my journey I have found multiple opportunities to relate my studies to my professional career.
		</blockquote>
		
		<fade-list>
			
			<ul class="separated-list">
				<fade-item>
					<li>
						Current &dash; Arapahoe Community College<br />
						Associate of Arts (Psychology).
					</li>
				</fade-item>
								
				<fade-item>
					<li>
						2019 &dash; Arapahoe Community College<br />
						Project Management Certificate.
					</li>
				</fade-item>
								
				<fade-item>
					<li>
						2005 &dash; American Management Association<br />
						Project Management Training.
					</li>
				</fade-item>
								
				<fade-item>
					<li>
						1996 &dash; Graduate Diploma of Information Technology<br />
						Queensland University of Technology &dash; Brisbane, Australia
					</li>
				</fade-item>
								
				<fade-item>
					<li>
						1992 &dash; Diploma of Education.<br />
						Macquarie University &dash; Sydney, Australia
					</li>
				</fade-item>
								
				<fade-item>
					<li>
						1991 &dash; Bachelor of Arts.<br />
						Macquarie University &dash; Sydney, Australia
					</li>
				</fade-item>
			</ul>
			
		</fade-list>
		
	</sweep-panel>
							
	
</flash-card>
<flash-card onload="equalize ($('#management_image'), $('#management_blurb'));">


	<popup-panel id="management_tip" class="starburst" easing="bounce" delay="4" style="left: 15%; top: 30%; transform: rotate(-15deg);">

		<contents>
			<div class="contents">This website is an example of how Rex can take an idea and make it a reality!</div>
			<div class="footer">Cool, huh?</div>
		</contents>

	</popup-panel>


	<sweep-panel id="management_image" class="sweep-image" visible="false" direction="right,up">
		<div class="title">Management</div>
		<img src="Images/stormy.jpg" style="width: auto; height: 40vh;" />
	</sweep-panel>


	<sweep-panel id="management_blurb" class="sweep-blurb" visible="false" direction="left,down" onenter="$(this).children ('fade-list').dom_object.run (function () {
		arm_popup ($('#management_tip').dom_object, 2);
	});">

		<fade-list class="paragraphs">

			<fade-item>
				<p>
					In addition to my extensive experience as a software developer, I have managed many projects from initial concept to final deployment.
					As a contractor, it is necessary to understand all aspects of product development.
				</p>
			</fade-item>

			<fade-item>
				<p>
					As such I have liaised with customers in order to determine their requirements and have had to learn quickly about their business and
					provide a roadmap to a solution for their technical needs and desires.
				</p>
			</fade-item>

			<fade-item>
				<p>
					I have also been required to determine the best technologies to suit their requirements, schedule the development as well as provide
					technical services. At various times, I have employed third-party programmers to complete projects on time. In addition, I have extensive
					experience managing volunteers as an executive of various chapters of Toastmasters International, which has also helped substantially in
					improving my communication and leadership skills.
				</p>
			</fade-item>

			<fade-item>
				<p>
					Tools used in project management include Atlassian JIRA and Microsoft Project as well as the Agile development methodology. To further
					increase my skills, I have Project Management Certification and continue to study at Arapahoe Community College (once a client of mine).
				</p>
			</fade-item>

		</fade-list>

	</sweep-panel>

</flash-card>

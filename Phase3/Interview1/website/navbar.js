//This simply write the html for the navbar
//this is used only as a workaround to import html to html
document.write('\
<link rel="stylesheet" href="navbar.css">\
<header>\
	<div class="navbar">\
		<h2>\
			SIUE\
		</h2>\
	</div>\
	<div class="navbar">\
		<h3>\
			College of Arts and Sciences\
		</h3>\
	</div>\
	<div class="navbar">\
		<h5>\
			Chemistry Department\
		</h5>\
	</div>\
	<div class="navbar">\
		<a href="homepage.html" target="_parent" class = "imgContainer">\
			<img src="images/home.png" alt="" height="20" width="20">\
		</a>\
		<div class="dropdown">\
			<button class="dropbtn">Department Info\
				<img src="images/dropdown.png" alt="" height="10" width="10">\
				<i class="fa fa-caret-down"></i>\
			</button>\
			<div class="dropdown-content">\
				<a href="contact.html" target="_parent">Map</a>\
				<a href="department/equipment.html" target="_parent">Equipment</a>\
				<a href="department/clubs.html" target="_parent">Clubs</a>\
				<a href="department/lab.html" target="_parent">Lab Policy</a>\
				<a href="department/studentServices.html" target="_parent">Student Services</a>\
				<a href="department/standards.html" target="_parent">Academic Standards</a>\
				<a href="department/opportunities.html" target="_parent">Opportunities in Chemistry</a>\
			</div>\
		</div> \
		<div class="dropdown">\
			<button class="dropbtn">Faculty and Staff\
				<img src="images/dropdown.png" alt="" height="10" width="10">\
				<i class="fa fa-caret-down"></i>\
			</button>\
			<div class="dropdown-content">\
				<a href="faculty/advisors.html" target="_parent">Advisors</a>\
				<a href="faculty/facultylist.html" target="_parent">Faculty List</a>\
				<a href="faculty/research.html" target="_parent">Research</a>\
			</div>\
		</div> \
		<div class="dropdown">\
			<button class="dropbtn">Graduate\
				<img src="images/dropdown.png" alt="" height="10" width="10">\
				<i class="fa fa-caret-down"></i>\
			</button>\
			<div class="dropdown-content">\
				<a href="graduate/courses.html" target="_parent">Courses</a>\
				<a href="graduate/forms.html" target="_parent">Student Forms</a>\
				<a href="graduate/thesis.html" target="_parent">Thesis Info</a>\
				<a href="graduate/program.html" target="_parent">Program Info</a>\
				<a href="graduate/financial.html" target="_parent">Financial Aid</a>\
				<a href="graduate/research.html" target="_parent">Research Projects</a>\
				<a href="graduate/resources.html" target="_parent">Chemistry Resources</a>\
			</div>\
		</div> \
		<div class="dropdown">\
			<button class="dropbtn">Undergraduate\
				<img src="images/dropdown.png" alt="" height="10" width="10">\
				<i class="fa fa-caret-down"></i>\
			</button>\
			<div class="dropdown-content">\
				<a href="undergrad/courses.html" target="_parent">Courses</a>\
				<a href="undergrad/program.html" target="_parent">Program Info</a>\
				<a href="undergrad/tutoring.html" target="_parent">Tutoring</a>\
				<a href="undergrad/financial.html" target="_parent">Financial Aid</a>\
				<a href="undergrad/senior.html" target="_parent">Senior Assignment</a>\
				<a href="undergrad/graduation.html" target="_parent">Graduation</a>\
				<a href="undergrad/resources.html" target="_parent">Chemistry Resources</a>\
			</div>\
		</div> \
		<a href="contact.html" target="_parent">Contact Us</a>\
	</div>\
</header>\
');
<html>


<head>

	<script src="/Scripts/Library/Common/External/jquery.js"></script>
	
	<script src="/Scripts/Library/Common/common.js"></script>
	<script src="/Scripts/Library/Common/extensions.js"></script>
	<script src="/Scripts/Library/Common/prototypes.js"></script>
	<script src="/Scripts/Library/Common/initialize.js"></script>

</head>


<script>

	function doit () {
		alert ($("div.inner").first_cousin);
		return false;
	}// doit;

</script>


<script>

</script>


<body>

	<div class="outer">
		<div><div class="inner" onclick="alert ($(this).previous_cousin ('div.outer').outer_html);">previous</div></div>
		<div><div class="inner" onclick="alert ($(this).last_cousin ('div.outer').outer_html);">last</div></div>
		<div><div class="inner" onclick="alert ($(this).first_cousin ('div.outer').outer_html);">first</div></div>
		<div><div class="inner" onclick="alert ($(this).next_cousin ('div.outer').outer_html);">next</div></div>
	</div>

	<button onclick="return doit ();">Doit</button>
	
</body>


</html>

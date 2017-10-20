var url = 'https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json';
var data;

function makeForce() {
	var w = window.innerWidth * 0.9,
			h = window.innerHeight * 0.9;
	var circleWidth = 5;

	var nodes = data.nodes;
	var links = data.links;

  var chart = d3.select('#chart')
	var tooltip = d3.select('.tooltip');

	var svg = chart.append('svg')
			.attr('width', '100%')
			.attr('height', '97vh')

	var force = d3.layout.force()
			.nodes(nodes)
			.links(links)
			.gravity(1)
			.charge(-600)
			.size([w,h])

	var link = svg.selectAll('line')
			.data(links)
			.enter().append('line')
			.attr('stroke', "grey")

	var node = chart.select('.flagbox').selectAll('.node')
		.data(nodes)
		.enter()
		.append('img')
		.attr('class', d => 'flag flag-' + d.code)
		.attr('title', d => d.country)
		.call(force.drag);


	force.on('tick', function(e) {

		node.style('left', d => (d.x - 8) + "px")
			.style('top', d => (d.y - 5) + "px");

		link.attr('x1', function(d) { return d.source.x })
			.attr('y1', function(d) { return d.source.y })
			.attr('x2', function(d) { return d.target.x })
			.attr('y2', function(d) { return d.target.y })

	})

	force.start();
}

d3.json(url, function(d) {
	data = d;
	makeForce();
})

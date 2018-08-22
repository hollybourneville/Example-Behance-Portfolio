$(function(){


	var key = '7gnVWxClxh5h0es4WErZr2ZjgdbJ4So6'; //key from behance - get this key from googling behance api then start application

	let urlProjects = 'https://api.behance.net/v2/users/Alexandre_Kudimov/projects?client_id='+key;

	if($('#index').length > 0){
		$.ajax({

			url:urlProjects,
			dataType:'jsonp',
			success:function(res){

				_(res.projects).each(function(project){
					console.log(project);
					$('<li><img src="'+project.covers[404]+'" alt=""><div class="overlay"><div class="name">'+project.name+'</div><a href="project.html?id='+project.id+'">see more</a></div></li>')

					.appendTo('ul.projects');
				});
			}

		});

	}

	if($('#project').length > 0){

		let pageURL = new URL(document.location);

		let params = pageURL.searchParams;
		let id = params.get('id');

		let urlProject = 'http://www.behance.net/v2/projects/'+id+'?api_key='+key;

		$.ajax({
			url:urlProject,
			dataType:'jsonp',
			success:function(res){
				let project = res.project;

				$('<h1>'+project.name+'</h1>').appendTo('.container')
				$('<p>'+project.description+'</p>').appendTo('.container')
				$('<h3>'+moment.unix(project.published_on).fromNow()+'</h3>').appendTo('.container') //using moment .js to convert date, published on found in dom
				$('<img src="'+project.covers.original+'" alt="">').appendTo('.container')

			}
		})
	}



});
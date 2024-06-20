const button_svg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><path d="M8 22h8c2.828 0 4.243 0 5.121-.878C22 20.242 22 18.829 22 16v-1c0-2.828 0-4.242-.879-5.121c-.768-.768-1.946-.865-4.121-.877m-10 0c-2.175.012-3.353.109-4.121.877C2 10.758 2 12.172 2 15v1c0 2.829 0 4.243.879 5.122c.3.3.662.497 1.121.627"/><path stroke-linejoin="round" d="M12 2v13m0 0l-3-3.5m3 3.5l3-3.5"/></g></svg>'
const volume_svg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M15 4.194v15.612a1.1 1.1 0 0 1-1.74.895L6.68 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.68l6.58-4.7a1.1 1.1 0 0 1 1.74.894m-2 1.75L7.842 9.626A2 2 0 0 1 6.68 10H4v4h2.68a2 2 0 0 1 1.162.372L13 18.057zm5.255.917a1 1 0 0 1 1.412-.078A6.985 6.985 0 0 1 22 12a6.985 6.985 0 0 1-2.333 5.217a1 1 0 1 1-1.334-1.49A4.985 4.985 0 0 0 20 12c0-1.48-.642-2.81-1.667-3.727a1 1 0 0 1-.078-1.412m-.588 2.158A3.992 3.992 0 0 1 19 12a3.99 3.99 0 0 1-1.333 2.981a1 1 0 0 1-1.422-1.4l.088-.09c.41-.368.667-.899.667-1.491a1.99 1.99 0 0 0-.548-1.376l-.119-.115a1 1 0 0 1 1.334-1.49"/></g></svg>'

currently_visible_videos = []
var accessToken

function getTempToken() {
	// let token
	return fetch('https://api.redgifs.com/v2/auth/temporary')
		.then(response => response.json())
		.then(json => json)
		.catch(error => {
			console.log('Unable to get temporary token from redgifs api, error:')
			console.log(error)
			return
		});
}

async function getLinkFromId(id, accessToken) {
	const metadata = await fetch('https://api.redgifs.com/v2/gifs/' + id, {
		headers: {
			'Authorization': 'Bearer ' + accessToken,
		}
	}).then(response => response.json())
	// .then(rjson => {metadata = rjson})
	// console.log('metadata:')
	// console.log(metadata)
	return metadata['gif']['urls']['hd']
}


async function addButton(video) {
	parent = video.parentNode.parentNode.parentNode.parentNode
	vid_sidebar = parent.getElementsByClassName("GifPreview-SideBarWrap")[0];
	var li = document.createElement("li");
	li.classList.add("SideBar-Item");
	var button = document.createElement("a");
	button.classList.add("redown-DownloadButton");
	li.appendChild(button);
	button.innerHTML = button_svg;
	button.setAttribute("role", "button");
	button.setAttribute("target", "_blank");

	// const video = parent
	// .getElementsByClassName("TapTracker")[0]
	// ?.getElementsByClassName("Player")[0]
	// ?.getElementsByClassName("Player-Video")[0]
	// ?.children[0];
	// const video = parent.getElementsByTagName("video")[0];
	// console.log('VIDEO:')
	// console.log(video)

	if (!video) {
		// console.log('REDOWN ERROR: "video" component not found (TapTracker>Player>Player-Video>video) on ')
		// console.log(parent)
		return
	}
	video.volume = parseInt(range.value)/100;
	currently_visible_videos.push(video);

	button.href = await getLinkFromId(parent.id.split("gif_")[1], accessToken)

	var sidebarlist = vid_sidebar.children[0];
	sidebarlist.insertBefore(li, sidebarlist.childNodes[sidebarlist.childNodes.length - 1]);
}

console.log("REDOWN IS RUNNING");

var observer = new MutationObserver(mutations => {
	mutations.forEach(async (mutation) => {
		// console.log("mutation entry")
		if (mutation.addedNodes) {
			// console.log("mutation execute")
			for (var i = mutation.addedNodes.length - 1; i >= 0; i--) {
				const node = mutation.addedNodes[i];
				// console.log('ADD')
				// console.log(node)
				// if (node.classList && node.classList.contains("GifPreview-SideBarWrap")) {
				if (node.tagName === 'VIDEO') {
					// console.log("FOUND")
					// console.log(node)
					addButton(node);
					// console.log('CURRENTLY VISIBLE(+1): ')
					// console.log(currently_visible_videos)
				}
			}
		}
		if (mutation.removedNodes) {
			for (var i = mutation.removedNodes.length - 1; i >= 0; i--) {
				const node = mutation.removedNodes[i];
				// if (node.classList && node.classList.contains("TapTracker")) {
				// 	const video = node
				// 		.getElementsByClassName("Player")[0]
				// 		?.getElementsByClassName("Player-Video")[0]
				// 		?.children[0];;
				// 	if (!video) {
				// 		console.log(`REMOVING FAILED, VIDEO NOT FOUND`)
				// 		console.log(node)
				// 		return;
				//	}
				if (node.tagName === 'VIDEO') {
					video = node
					const index = currently_visible_videos.indexOf(video);
					// console.log(`REMOVING AT INDEX ${index}`)
					if (index > -1) currently_visible_videos.splice(index, 1);
					// console.log('CURRENTLY VISIBLE (-1): ')
					// console.log(currently_visible_videos)
				}
			}
		}
	});
});

const vol_slider_html = `
	<div class="range-slider" id="range-slider">
		<input class="input-range" id="vol-input-range" type="range" step="1" value="50" min="0" max="100">
		<div class="range-value"> 
			${volume_svg} 
			<span id="vol-range-value"></span>
		</div>
	</div>
`;

function setup() {
	// const parent = document.getElementsByClassName("right side")[0];
	const parent = document.body;
	// console.log(parent);
	parent.insertAdjacentHTML("beforeend", vol_slider_html);


	range = document.getElementById('vol-input-range');
	var value_span = document.getElementById('vol-range-value');
	chrome.storage.local.get(['last_volume']).then((result) => {
		console.log(result)
		range.value = result?.last_volume || 50;
		value_span.textContent = range.value;
	});


	range.addEventListener('input', function(){
		value_span.textContent = range.value + '%';
		// console.log("CURRENTLY VISIBLE VIDEOS:")
		// console.log(currently_visible_videos)
		currently_visible_videos.forEach(a => {a.volume = parseInt(range.value)/100});
		chrome.storage.local.set({ last_volume: range.value })
	});
}

(async () => {
	accessToken = (await getTempToken())['token']
	// console.log('Temp access token is ' + accessToken)
})();

// setTimeout(setup, 2000) // needed if you want to insert vol slider inside right-side, which causes problems on some pages
setup();

observer.observe(document.body.parentNode, { childList: true, subtree: true });
// observer.observe(document.getElementsByClassName("previewFeed")[0].parentNode, { childList: true, subtree: true });

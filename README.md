# ReDown: RedGIFs download and volume helper extension

~After the recent changes from RedGIFs (as of 15th December 2023), you can't right clock and save a video anymore (instead you have to replace the `/watch/<id>` url with `/ifr/<id>`).~

After even more recent changes (April/May?) the `/ifr/` links do not allow you to download either. Now we make use of their API and get a temporary token to access direct URLs of videos (but they are short lived).

This extensions adds a button which links directly to the video (which needs to be **right clicked** and use the save linked content option as before; left-click will open the video (.mp4) in a new tab).

![image](https://github.com/user-attachments/assets/3ac0bb50-6564-4b57-ac61-f10c497d1d17)

<!-- <img src="https://github.com/ldx23/redown-redgifs-download-extension/assets/140859555/9eafdbb2-882e-4648-a787-710c21180ac7" width="30%">
<img src="https://github.com/ldx23/redown-redgifs-download-extension/assets/140859555/3c607781-fd8a-4c26-94c7-11797d567adc" width="69%">
-->

This also adds a simple volume control slider because for some reason this website's media is insanely loud.
It has some nice stuff too like remembering your last set volume level and only keeping track of the loaded ad visible videos.
<!-- ![image](https://github.com/ldx23/redown-redgifs-download-extension/assets/140859555/caacd7a9-958a-4262-bdf7-3cfaabd30417) -->

# Download/Install
This process is the same for any local exension.

> [!NOTE]
> Make sure you have developer mode turned on, on the extensions page.

1. Go to [the releases page](https://github.com/ldx23/redown-redgifs-downloader/releases) and download the latest `.crx`
2. Drag the downloaded crx on the extensions page

If this does not work, look at the note in the "important" block below.

### Why not chrome web store?
- 5$ registration fee
- they remove extensions on a whim, most extensions relating in any way to nsfw content are removed
- fuck google <3

> [!IMPORTANT]
> Chrome [does not allow local `.crx`](https://support.google.com/chrome_webstore/answer/2811969?visit_id=638575151822998393-3848790426&p=ui_remove_non_cws_extensions&hl=en&rd=2) to be installed anymore. https://github.com/ldx23/redown-redgifs-downloader/issues/1
>
> To get around this, you will need to unzip the `.crx` first (it's just a simple `.zip` so even windows unzip would work), and then drag-drop that folder onto the extensions page. 
>
> _I guess this only adds to the above list of "why not chrome web store"_

---
ReDown is provided under a [GNU GPL v3.0 License](/LICENSE) \
"Broken Download" icon has been taken from [Solar Icons set](https://www.figma.com/community/file/1166831539721848736/solar-icons-set) made by [480design](https://www.figma.com/@480design) which is under a [CC BY 4.0 license](https://creativecommons.org/licenses/by/4.0/) \
"Volume" icon has been taken from [MingCute Icons set](https://github.com/Richard9394/MingCute) which is under a [Apache License 2.0](https://github.com/Richard9394/MingCute/blob/main/LICENSE) \
All screenshots have been taken on Opera GX.

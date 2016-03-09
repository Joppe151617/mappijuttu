var zoomLvl = 1;
var KOKO = 256;

$(function() {
    $("#rainbow").draggable();

    $('#rainbow').mousewheel(function(event, delta) {
        var vanhaX = $("#rainbow").offset().left;
        var vanhaY = $("#rainbow").offset().top;
        var x = event.pageX - $("#rainbow").offset().left;
        var y = event.pageY - $("#rainbow").offset().top;
        var levKor = KOKO * Math.pow(2,(zoomLvl-1));
        var sijx = x * 100 / levKor;
        var sijy = y * 100 / levKor;
        if (0 < zoomLvl + delta && zoomLvl + delta <= 9) {
            zoomLvl += delta;
            $("#rainbow").css("width", KOKO * Math.pow(2,(zoomLvl-1)));
            $("#rainbow").css("height", KOKO * Math.pow(2,(zoomLvl-1)));
            var ulevKor = KOKO * Math.pow(2,(zoomLvl-1));
            var usijx = ulevKor/100 * sijx;
            var usijy = ulevKor/100 * sijy;
            $("#rainbow").css("top", vanhaY - (usijy - y));
            $("#rainbow").css("left", vanhaX - (usijx - x));
        }
        event.stopPropagation();
        event.preventDefault();
    });

    $("#rainbow").onPositionChanged(function(loc){ <!-- loc.top loc.left -->
		var monesl = loc.left < 0 ? Math.floor(loc.left / KOKO * -1) : 0;
		var lmuisti = monesl;
        var monesk = loc.top < 0 ? Math.floor(loc.top / KOKO * -1) : 0;
        for ( topk = loc.top > 0 ?loc.top : 0; topk < $(window).height()+KOKO; topk = topk + KOKO) {
            for ( left = loc.left > 0 ?loc.left : 0; left < $(window).width()+KOKO; left = left + KOKO) {
				if (monesl < 0 || monesk < 0 || monesl >= (Math.pow(2,(zoomLvl-1))) || monesk >= (Math.pow(2,(zoomLvl-1))) ) {
					console.log("väärä paikka"+ Math.pow(2,(zoomLvl-1)));
					continue;
				}
                console.log("Moneskol " + monesl);
                console.log("Moneskok " + monesk);
                console.log(loc);
                console.log("left " + left + " top " + topk );
                console.log(zoomLvl);
                var zLvl = zoomLvl-1;
                if ($("#img_"+zLvl +"_"+monesl+"_"+monesk).length) {
                    console.log("Kuva olemassa, ei turhaan luoda uutta samalaista!");
                } else {
                    console.log("Luodaan kuva");
                    var img = $('<img>')
                    img.attr("id", "img_"+zLvl+"_"+monesl+"_"+monesk);
                    img.addClass("img_" + zLvl);
                    img.width(256);
                    img.height(256);
                    img.attr("src", "kuvat\\"+zLvl+"\\"+zLvl+"_"+monesl+"_"+monesk+".jpg");
                    img.css("left", monesl * KOKO);
                    img.css("top", monesk * KOKO);
                    $("#rainbow").append(img);
                }
				monesl++;
			}
			monesl = lmuisti;
			monesk++;
		}
    });
});

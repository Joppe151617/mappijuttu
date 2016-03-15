var zoomLvl = 0;
var zmuisti = zoomLvl;
var KOKO = 256;

$(function() {
    $("#rainbow").draggable();
	haeKuvat($("#rainbow").position());
    $('#rainbow').mousewheel(function(event, delta) {
        var vanhaX = $("#rainbow").offset().left;
        var vanhaY = $("#rainbow").offset().top;
        var x = event.pageX - $("#rainbow").offset().left;
        var y = event.pageY - $("#rainbow").offset().top;
        var levKor = KOKO * Math.pow(2,(zoomLvl));
        var sijx = x * 100 / levKor;
        var sijy = y * 100 / levKor;
        if (0 <= zoomLvl + delta && zoomLvl + delta <= 8) {
            zoomLvl += delta;
            $("#rainbow").css("width", KOKO * Math.pow(2,(zoomLvl)));
            $("#rainbow").css("height", KOKO * Math.pow(2,(zoomLvl)));
            var ulevKor = KOKO * Math.pow(2,(zoomLvl));
            var usijx = ulevKor/100 * sijx;
            var usijy = ulevKor/100 * sijy;
            $("#rainbow").css("top", vanhaY - (usijy - y));
            $("#rainbow").css("left", vanhaX - (usijx - x));
        }
		
		$("#rainbow img").hide();
		$(".img_" + zoomLvl).show();
		
        event.stopPropagation();
        event.preventDefault();
		haeKuvat($("#rainbow").position());
    });

    $("#rainbow").onPositionChanged(function(loc){ <!-- loc.top loc.left -->
		haeKuvat(loc);
    });
});

function haeKuvat(loc) {
	var monesl = loc.left < 0 ? Math.floor(loc.left / KOKO * -1) : 0;
	var lmuisti = monesl;
    var monesk = loc.top < 0 ? Math.floor(loc.top / KOKO * -1) : 0;
    for ( topk = loc.top > 0 ?loc.top : 0; topk < $(window).height()+KOKO; topk = topk + KOKO) {
        for ( left = loc.left > 0 ?loc.left : 0; left < $(window).width()+KOKO; left = left + KOKO) {
			if (monesl < 0 || monesk < 0 || monesl >= (Math.pow(2,(zoomLvl))) || monesk >= (Math.pow(2,(zoomLvl))) ) {
				continue;
			}
            if (!$("#img_"+zoomLvl +"_"+monesl+"_"+monesk).length) {
                var img = $('<img>')
                img.attr("id", "img_"+zoomLvl+"_"+monesl+"_"+monesk);
                img.addClass("img_" + zoomLvl);
                img.width(256);
                img.height(256);
                img.attr("src", "kuvat\\"+zoomLvl+"\\"+zoomLvl+"_"+monesl+"_"+monesk+".jpg");
                img.css("left", monesl * KOKO);
                img.css("top", monesk * KOKO);
                $("#rainbow").append(img);
            }
			monesl++;
		}
		monesl = lmuisti;
		monesk++;
	}
}


var widgetOptions = {
    searchInput: null,
    searchButton: null,
    adsBlock: null,
    adsRoute: null,
    adsClickRoute: null
};

var AdsWidget = {

    init: function(options) {
        widgetOptions = options;
        this.searchButtonClick();
        this.adsClick();
    },

    searchButtonClick: function() {
        widgetOptions.searchButton.click(function() {
            if (widgetOptions.searchInput.val() != '') {
                $.ajax({
                    url: widgetOptions.adsRoute,
                    data: { keywords: widgetOptions.searchInput.val() },
                    success: function(data) {
                        AdsWidget.buildTemplates(data);
                    }
                });
            }
        });
    },

    adsClick: function() {
        widgetOptions.adsBlock.on('click', 'div.ad-item', function() {
            var adId  = $(this).attr('data-id');
            $.ajax({
                url: widgetOptions.adsClickRoute,
                data: { adId: adId },
                type: 'POST',
                success: function () {
                    $.ajax({
                        url: widgetOptions.adsRoute,
                        data: { keywords: widgetOptions.searchInput.val() },
                        success: function(data) {
                            AdsWidget.buildTemplates(data);
                        }
                    });
                }
            });
            return false;
        });
    },

    buildTemplates: function(data) {
        widgetOptions.adsBlock.html('');
        $.each(data, function(key,item){
           var template;
           var openDivTag  = '<div class="list-group-item ad-item"' + 'data-id="' + item.id + '">';
           var titleTag    = '<h4 class="title"><a class="show-url" href="' + item.showUrl + '">' + item.title + '</a></h4>';
           var description = '<span class="text">' + item.description + '</span>';
           var closeDivTag = '</div>';

           template = openDivTag + titleTag + description + closeDivTag;
           widgetOptions.adsBlock.append(template);
        });
    }
};


/**************************************************************/
/* Module GPE
/**************************************************************/
var GPE = {
    list: function () {
        $('.ulist #expandlist > li')
            /* 
               When we click on the + symbol of an unordered list, then the list is expanded using a "medium" motion and the class expanded is added to the class collapsed
               of the <li class='collapsed'/> tag located after <ul/> tag
             */
            .click(function (event) {
                if (this == event.target) {
                    $(this).toggleClass('expanded');
                    $(this).find('ul').toggle('medium');
                }
                return false;
            })
            .addClass('collapsed')
            .find('ul').hide();

        $('.olist #expandlist > li')
            /* 
                When we click on the + symbol of an unordered list, then the list is expanded using a "medium" motion and the class expanded is added to the class collapsed
                of the <li class='collapsed'/> tag located after <ol/> tag
             */
            .click(function (event) {
                if (this == event.target) {
                    $(this).toggleClass('expanded');
                    $(this).find('ol').toggle('medium');
                }
                return false;
            })
            .addClass('collapsed')
            .find('ol').hide();

        //Create the button functionality
        $('#expandall')
            .unbind('click')
            .click(function () {
                $('.collapsed').addClass('expanded');
                $('.collapsed').children().show('medium');
            })

        $('#collapseall')
            .unbind('click')
            .click(function () {
                $('.collapsed').removeClass('expanded');
                $('.collapsed').children().hide('medium');
            })
    },

    popuplink: function(audio_file) {
        window.open(audio_file,
            'audio',
            'resizable=yes,status=no,location=no,toolbar=no,menubar=no,fullscreen=no,scrollbars=no,dependent=no,width=400,height=200');
        return false
    },

    /* Selection audioblock under a section tag and move it before the title */
    moveAudioBlock: function() {
        $('section').each(function () {
            var $this = $(this);
            var $audio = $this.find('.audioblock');
            var $audioHtml = $audio.html();
            if ($audioHtml != null) {
                $this.removeData($audioHtml);
                $audio.prependTo($this);
            }
        });
    },

    toggleShowSolutionBlock: function(solutionBlock) {
        solutionBlock.prev().toggleClass('stacked');
        solutionBlock.toggle();
    },

    function insertShowSolutionButtons() {
    $('.solution').each(function(idx, node) {
        var solutionBlock = $(node);
        var showSolutionButton = $('<a class="show-solution" href="#">Show solution</a>');
        solutionBlock.prev().append(showSolutionButton);
        showSolutionButton.on('click', function(event) {
            event.preventDefault();
            toggleShowSolutionBlock(solutionBlock);
            // Expose cheaters (as long as they don't refresh the page)
            showSolutionButton.text('Show/hide solution again');
        });
        toggleShowSolutionBlock(solutionBlock);
    });
}
};


/**************************************************************/
/* Functions to execute on loading of the document            */
/**************************************************************/
$(document).ready(function () {

    $.fn.or = function( fallbackSelector ) {
        return this.length ? this : $( fallbackSelector || 'body' );
    };

    // Check expandable and collapsable lists
    GPE.list();

    // Add click event for <a href where id=popuplink and audio-file
    $("a[id][audio-file]").click(function () {
        GPE.popuplink($(this).attr('audio-file'))
    });

    GPE.moveAudioBlock();

    GPE.insertShowSolutionButtons();

});

$(document).ready(function()
{
    var form_obj = $('form');
    var questions = $(".questions");
    var progress_bar = $("#progressTimer");
    var question_title = $("#question_title");
    var question_counter = 2;
    function show_modal()
    {
        var hash = window.location.hash.slice(1);
        if( hash && hash === 'rules-modal' ) {
            $('#' + hash).modal('show');
        };
    }
    function show_next_question(current_question)
    {
        var closest = current_question.closest('.questions');
        closest.find(':hidden').eq(0).val(time_remaining);
        var next_question = closest.next();
        setTimeout(function() {
                questions.hide();
                if (next_question.index() != -1)
                {
                    question_title.text('Question ' + question_counter++);
                    next_question.show();
                    time_remaining = 0;
                    progress_bar.html('<div class="progress xs active progress-striped"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="12" width="100%" style="width: 100%;"></div></div>');
                    enable_progress_timer();
                }
                else
                {
                    $('#quiz-form').submit();
                }
            }, 600);
    }
    function enable_progress_timer()
    {
        progress_bar.progressTimer({
            timeLimit: 13,
            warningThreshold: 7,
            dangerThreshold: 10,
            baseStyle: 'progress-bar-success',
            warningStyle: 'progress-bar-warning',
            completeStyle: 'progress-bar-danger',
            onFinish: function() {
                time_remaining = 0;
                show_next_question(questions.filter(':visible'));
            }
        });
    }
    $('.box-body').on('click', '#take-quiz', function()
    {
        window.location.href = $(this).data('redirect-to');
    });
    var form_obj = $('form');
    if(form_obj.length)
        form_obj.validator();
    var questions = $(".questions");
    if(questions.length)
    {
        $(" .questions input[type='radio']").on('ifChanged', function(event) {
            window.clearInterval(interval);
            show_next_question($(this));
        });
        enable_progress_timer();
    }
    var username = $('#username');
    if(username.length)
    {
        username.on('blur', function(){
            $(this).next().text('');
        });
    }
    show_modal();
});

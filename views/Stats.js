<script>

    function displayStats() {
        $.ajax({
            url: 'api/stats',
            type: 'GET',
            success: function(stats) {
                //use the stats data to update the DOM
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error(errorThrown);
            }
        })
    }

    
</script>
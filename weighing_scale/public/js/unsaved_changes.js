$(function() {


    console.log("::::::::::::::::::::::::::::::::::::::::")


    setTimeout(() => {
        window.addEventListener('beforeunload', function (e) {
            e.preventDefault();
            e.returnValue = '';
        });
    }, 1600);



    function unsavedChangesExist() {
        // Implement your logic here to check if there are unsaved changes
        // For example, check if certain form fields have been modified
        // Return true if unsaved changes exist, false otherwise
        return true; // Placeholder, replace with your logic
    }
});
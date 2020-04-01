$( document ).ready(function() { 

// Constants
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

    const $submit = $(`.btn-submit`);
    const $eatenBurgers = $(`.eaten-burger`);
    const $uneatenBurgers = $(`.uneaten-burger`);

// Adding/Updating/Deleting Burgers
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

// Add Burger

    function addBurger(burgerData) {
        $.post(`/api/burgers`, burgerData)
        .then(function(data) {
            addRow(data);
            console.log(data);
            M.toast({html: `Burger Added!`});
        });
    }

// Eat Burger

    function eatBurger({id, name, eaten}) {
        $.ajax({
            method: `PUT`,
            url: `/api/burgers/${id}`
        })
        .then(
            removeRow(id)
        )
        .then(function() {
            addRow({id, name, eaten});
            M.toast({html: `Burger Eaten!`});
        });
    }

// Delete Burger

    function deleteBurger(burgerData) {
        $.ajax({
            method: `DELETE`,
            url: `/api/burgers/${burgerData}`
        })
        .then(function() {
            removeRow(burgerData);
            M.toast({html: `Burger Removed!`});
        });
}

// Updating Tables
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

    function addRow({id, name, eaten}) {

        const eatenBurger = 
    `<tr>
        <td>${name}</td>
        <td class="right-align">
        <a class="waves-effect waves-light btn btn-delete" data-id="${id}" data-name="${name}" data-eaten="1">Delete</a>
        </td>
    </tr>`;
        const uneatenBurger =
    `<tr>
        <td>${name}</td>
        <td class="right-align">
        <a class="waves-effect waves-light btn btn-eat" data-id="${id}" data-name="${name}" data-eaten="0">Eat!</a>
        </td>
    </tr>`;

        if (eaten === 1 || eaten === true) {
            $eatenBurgers.prepend(eatenBurger);
        }

        else if (eaten === 0 || eaten === false){
            $uneatenBurgers.prepend(uneatenBurger);
        }
    };

    function removeRow(id) {

        return new Promise((resolve, reject) => {

            const delRow = $(`[data-id="${id}"]`).parents().eq(1);

            delRow.remove();
        
            resolve();
        });
    };

// Button Actions
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

// Adding Burger

    $submit.on(`click`, (event)=> {
        event.preventDefault();
        const burgerField = $(`#burger_name`);
        const burgerName = burgerField.val().trim();
        const burgerNameLen = burgerName.length;
        if (burgerNameLen < 1 || burgerNameLen > 128) {
            M.toast({html: `Please create a Burger Name between 1 and 128 characters`}); 
        }

        else {
            burgerField.val(``);
            const newBurger = {
                name: burgerName
            }
            addBurger(newBurger);
        }        
    });

// Updating Burger

    $(document).on(`click`, `.btn-eat`, function() {

       const eatenBurgerObj = {
           id: $(this).attr(`data-id`),
           name: $(this).attr(`data-name`),
           eaten: 1
       }

       eatBurger(eatenBurgerObj);
       
    });

// Deleting Burger

    $(document).on(`click`, `.btn-delete`, function() {
        const burgerId = $(this).attr(`data-id`);
        deleteBurger(burgerId);
    });

});
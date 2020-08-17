function main() {
    const baseUrl = "https://www.themealdb.com/api/json/v1/1/";
    const getDataCategories = async () => {
        try {
            const response = await fetch(`${baseUrl}/categories.php`);
            const responseJson = await response.json();
            if (responseJson.error) {
                showResponseMessage();
            } else {
                renderAllCategories(responseJson.categories);
            }
        } catch (error) {
            showResponseMessage();
        }
    }

    const renderAllCategories = (categories) => {
        const listCategories = document.querySelector("#main-konten");
        listCategories.innerHTML = "";

        categories.forEach(category => {
            listCategories.innerHTML += `
                <div class="col-md-3 mt-3">
                    <div class="card" id="${category.idCategory}">
                        <img src="${category.strCategoryThumb}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">${category.strCategory}</h5>
                            <p class="card-text">${category.strCategoryDescription.slice(0, 120)}</p>
                        </div>
                    </div>
                </div>
            `;
        });

        const mainContent = document.querySelector(".container-fluid");
        mainContent.addEventListener("click", (event) => {
            if (event.target.className == "card") {
                console.log('id');
            }
        });
    };



    const showResponseMessage = (message = "Check your internet connection") => {
        alert(message);
    };

    document.addEventListener("DOMContentLoaded", () => {
        getDataCategories();

    });

}

export default main;
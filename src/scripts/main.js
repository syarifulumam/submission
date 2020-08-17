function main() {
    const baseUrl = "https://www.themealdb.com/api/json/v1/1/";
    const getDataCategories = async () => {
        try {
            const response = await fetch(`${baseUrl}categories.php`);
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

    const listDataCategories = async (nameCategory) => {
        try {
            const response = await fetch(`${baseUrl}filter.php?c=${nameCategory}`);
            const responseJson = await response.json();
            if (responseJson.error) {
                showResponseMessage();
            } else {
                renderListCategories(responseJson.meals);
            }
        } catch (error) {
            showResponseMessage();
        }
    }

    const recipeMeal = async (nameMeal) => {
        try {
            const response = await fetch(`${baseUrl}search.php?s=${nameMeal}`);
            const responseJson = await response.json();
            if (responseJson.error) {
                showResponseMessage();
            } else {
                renderRecipeMeal(responseJson.meals);
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
                    <div class="card">
                        <img src="${category.strCategoryThumb}" class="card-img-top" id="${category.strCategory}">
                        <div class="card-body">
                            <h5 class="card-title">${category.strCategory}</h5>
                            <p class="card-text"   >${category.strCategoryDescription.slice(0, 120)}</p>
                        </div>
                    </div>
                </div>
            `;
        });

        const idCard = document.querySelectorAll(".card");
        idCard.forEach(id => {
            id.addEventListener("click", event => {
                listDataCategories(event.target.id);
            });
        });
    };

    const renderListCategories = (meals) => {
        const listCategories = document.querySelector("#main-konten");
        listCategories.innerHTML = "";

        meals.forEach(meal => {
            listCategories.innerHTML += `
                <div class="col-md-3 mt-3">
                    <div class="card">
                        <img src="${meal.strMealThumb}" class="card-img-top" id="${meal.strMeal}">
                        <div class="card-body">
                            <h5 class="card-title">${meal.strMeal}</h5>
                        </div>
                    </div>
                </div>
            `;
        });

        const idCard = document.querySelectorAll(".card");
        idCard.forEach(id => {
            id.addEventListener("click", event => {
                recipeMeal(event.target.id);
            });
        });
    };

    const renderRecipeMeal = (meals) => {
        const listCategories = document.querySelector("#main-konten");
        let i = 0;
        listCategories.innerHTML = "";

        listCategories.innerHTML += `
            <div class="card mb-3">
                <div class="row no-gutters">
                    <div class="col-md-4">
                    <img src="${meals[0].strMealThumb}" class="card-img-top">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${meals[0].strMeal}</h5>
                        <p class="card-text">${meals[0].strInstructions}</p>`
        for (const [key, value] of Object.entries(meals[0])) {
            if (key.startsWith('strIngredient') && value !== '') {
                `<p class="card-text">-${value}</p>`;
            }
        }
        `</div>
                    </div>
                </div>
            </div>
        `;

    };



    const showResponseMessage = (message = "Check your internet connection") => {
        alert(message);
    };

    document.addEventListener("DOMContentLoaded", () => {
        const keyword = document.querySelector("#keyword");
        const submit = document.querySelector("#submit");

        getDataCategories();

        //event menu navbar
        const navItem = document.querySelectorAll(".nav-item");
        navItem.forEach(navitem => {
            navitem.addEventListener("click", event => {
                listDataCategories(event.target.id);
            });
        });

        //cari resep
        submit.addEventListener("click", event => {
            recipeMeal(keyword.value);
        });

    });

}

export default main;
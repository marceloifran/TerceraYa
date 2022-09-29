const cardAmin = document.getElementById('admin')

const api = async () => {
    try {
        const res = await fetch('https://terceraya-c1da6-default-rtdb.firebaseio.com/ifsin/admin.json')
        console.log(res);

        if (res.status === 200) {
            const datos = await res.json();
            console.log(datos);
        

            for (const i in datos) {
                console.log(datos[i])
                const {
                    nombre,
                    telefono,
                    img1,
                    img2,
                    img3,
                    ubicacion,
                    desc,
                    ofer1,
                    ofer2,
                    ofer3,
                    ofer4
                } = datos[i]
              
                cardAmin.innerHTML += `

        <figure class="text-center">
        <blockquote class="blockquote">
        <p>"${nombre}"</p>
        </blockquote>
        <figcaption class="blockquote-footer">
        <cite title="Source Title">${ubicacion}</cite>
        </figcaption>
        <figcaption class="blockquote-footer">
        <cite title="Source Title">${desc}</cite>
        </figcaption>
</figure>
        <div class="slider-frame" style=border:"2px solid blue;">
        <ul>
            <li><img src="${img1}" alt=""><p class="text-center" id="oferta">${ofer1}</p></li>
            <li><img src="${img2}" alt=""><p class="text-center" id="oferta">${ofer2}</p></li>
            <li><img src="${img3}" alt=""><p class="text-center" id="oferta">${ofer3}</p></li>
            <li><img src="${img1}" alt=""><p class="text-center" id="oferta">${ofer4}</p></li>
        </ul>
        </div>
        <div class="text-center">
        <a href="https://api.whatsapp.com/send?phone=${telefono}&text=Vengo%20desde%20Ifsin" class="btn btn-success btn-lg enabled" tabindex="-1" role="button" aria-enabled="true"> <img src="img_demas/whatsapp.png" alt="" style="width: 30px;"> WhatsApp</a>
        <a id="btnm" href="tel:+${telefono}" class="btn btn-primary btn-lg enabled" tabindex="-1" role="button" aria-enabled="true"><img src="img_demas/llamada-telefonica.png" alt="" style="width: 30px;"> Llamada</a>
        </div>
        <hr>

        `
                
            }
           

        }


    } catch (err) {
        console.log(err);
    }
}


api();
   
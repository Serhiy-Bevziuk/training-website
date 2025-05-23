import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Photo() {
  const images = [
    { src: '/images/1200px-haas-in-het-grasjpg.webp', alt: 'Зайці в траві' },
    { src: '/images/1200px-hasebeioberwerbejpg.webp', alt: 'Зайці в полі' },
    { src: '/images/european-hare-6121jpg.webp', alt: 'Європейський заєць' },
    { src: '/images/fFKuESpf7VTCGBNPscig.webp', alt: 'Зайці на лузі' },
    { src: '/images/halljnes.webp', alt: 'Зайці в лісі' },
    { src: '/images/zu6YRoYqGYVyExZ54dDT.webp', alt: 'Зайці на лузі' }
  ];

  return (
    <main class="container py-4">
      <div id="pandaCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#pandaCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#pandaCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#pandaCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <a href="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/P.t.altaica_Tomak_Male.jpg/1200px-P.t.altaica_Tomak_Male.jpg?20140611213919" target="_blank">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/P.t.altaica_Tomak_Male.jpg/1200px-P.t.altaica_Tomak_Male.jpg?20140611213919" class="d-block w-100" alt="tiger_1" />
            </a>
          </div>
          <div class="carousel-item">
            <a href="https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Panthera_tigris_altaica_%28Amurtiger_straekker_sig%29.jpg/330px-Panthera_tigris_altaica_%28Amurtiger_straekker_sig%29.jpg" target="_blank">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Panthera_tigris_altaica_%28Amurtiger_straekker_sig%29.jpg/330px-Panthera_tigris_altaica_%28Amurtiger_straekker_sig%29.jpg"
                class="d-block w-100" alt="tiger_2" />
            </a>
          </div>
          <div class="carousel-item">
            <a href="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/5-hayvan-resimleri.jpg/375px-5-hayvan-resimleri.jpg"
              target="_blank">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/5-hayvan-resimleri.jpg/375px-5-hayvan-resimleri.jpg"
                class="d-block w-100" alt="tiger_3" />
            </a>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#pandaCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#pandaCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </main>

  );
}

export default Photo;
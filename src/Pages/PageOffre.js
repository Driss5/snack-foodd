import Navbar from "../Components/Navbar";
import DownLinks from "../Components/DownLinks";
import "../css/offre.css";
import Card from "../Components/Cards";

function PageOffre() {
    return (
        <div>
            <Navbar />
                <div className="offre-container">
                    <div className="offre-header">
                        <p>Kayniin Les Offres Had Nhaar Tfadaal !</p>
                        <p>Hwd L ta7t O marhbaa biiik</p>
                    </div>
                    <div className="offre-image">
                        <img src="/Images/food/2.png" alt="Offre 1" />
                    </div>
                    <div className="offre-footer">
                        <button>Tfadaaal</button>
                    </div>
                </div>

                <div className="offres-container">
                    <Card />
                </div>
            <DownLinks />
        </div>
    );
}
export default PageOffre;
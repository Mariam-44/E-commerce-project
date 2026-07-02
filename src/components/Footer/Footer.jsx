import img1 from "../../assets/images/amazon-pay.png";
import img2 from "../../assets/images/American-Express-Color.png";
import img3 from "../../assets/images/paypal.png";
import img4 from "../../assets/images/mastercard.webp";
import img5 from "../../assets/images/get-apple-store.png";
import img6 from "../../assets/images/get-google-play.png";

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-100 py-8 mt-3">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Get the FreshCart App</h3>
            <p className="text-sm text-gray-600">
              We'll send you a link, open it on your phone to download the app
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 mt-4">
              <input
                type="email"
                placeholder="Email Address"
                className="sm:col-span-9 form-control"
              />
              <button className="sm:col-span-3 btn text-white text-sm bg-yellow-500 hover:bg-yellow-600 whitespace-nowrap">
                SHARE APP LINK
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:flex-wrap lg:justify-between lg:items-center gap-6 border-t border-gray-300 pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <p className="text-sm font-medium sm:pe-2">Payment Partners</p>
              <div className="flex flex-wrap items-center gap-4">
                <img src={img1} alt="Amazon Pay" className="h-6" />
                <img src={img2} alt="American Express" className="h-6" />
                <img src={img3} alt="MasterCard" className="h-6" />
                <img src={img4} alt="PayPal" className="h-6" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <p className="text-sm font-medium sm:pe-2">
                Get deliveries with FreshCart
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <img src={img5} alt="App Store" className="h-8" />
                <img src={img6} alt="Google Play" className="h-8" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
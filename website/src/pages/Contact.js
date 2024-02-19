import Navbar from "../components/Navbar";
import "../css/contact.css";
import contactimg from "../assets/contact.jpg";
const Contact = () => {
  return (
    <>
      <Navbar />

      <div class="container py-5">
        <div class="row py-2 g-3">
          <div class="col-lg-6 ">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d124461.06842450322!2d77.48426584190662!3d12.881440922570695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3bae3ffcc3cb3149%3A0xe208e403035e51f6!2sNo.%207%2C%201st%20Cross%2C%20Chunchanakatte%2C%20New%20Bank%20Colony%2C%20PNB%20Layout%2C%20Konanakunte%2C%20Bengaluru%2C%20Karnataka%20560062!3m2!1d12.8814538!2d77.5666677!5e0!3m2!1sen!2sin!4v1699268366670!5m2!1sen!2sin"
              class="h-100 w-100 m"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </div>

          <div class="col-md-8 first_col ml-20">
            <h1 class="text-center mt-3">Contact Us</h1>
            <form class=" contactcont p-5">
              <div class="mb-3">
                <label
                  for="exampleFormControlInput1"
                  class="form-label"
                  style={{ paddingTop: "-90px" }}
                >
                  Enter your Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                />
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Email ID
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                />
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">
                  Enter your massage
                </label>
                <textarea
                  type="text"
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>
              <div>
                <button class="contactbutton">Send </button>
              </div>
            </form>
          </div>
          <></>
        </div>
      </div>
    </>
  );
};
export default Contact;

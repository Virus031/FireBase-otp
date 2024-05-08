import React, { useState } from "react";
import {
  Button,
  InputGroup,
  Form,
  Container,
  Col,
  Row,
  Card,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

// import { BsArrowRepeat as CgSpinner } from 'react-icons/bs';
import { CgSpinner } from "react-icons/cg";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import OTPInput, { ResendOTP } from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

function Home() {
  const [showRestaurantDetails, setShowRestaurantDetails] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedRestaurantimage, selectedRestaurantImage] = useState(null);
  const [OTP, setOTP] = useState("");

  // const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  const restaurants = [
    {
      id: 1,
      name: "Spice Junction",
      url: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 2,
      name: "Bella Napoli",
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 4,
      name: "Sushi Samurai",
      url: "https://plus.unsplash.com/premium_photo-1674004585426-c6ad2adbe4c0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 5,
      name: "The Rustic Spoon",
      url: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 7,
      name: "Cafe Roma",
      url: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 8,
      name: "Fiesta Mexicana",
      url: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 9,
      name: "Peking Garden",
      url: "assets/image_2024_05_06T11_58_54_865Z.png",
    },
    {
      id: 14,
      name: "Himalayan Spice",
      url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 15,
      name: "Sunset Grill & Bar",
      url: "https://media.istockphoto.com/id/1428594094/photo/empty-coffee-shop-interior-with-wooden-tables-coffee-maker-pastries-and-pendant-lights.webp?b=1&s=170667a&w=0&k=20&c=TTATB_esYszT-yzqQixyDBJeZQfcXjHwDs6-PhnMDcE=",
    },
  ];

  // const handleVisitRestaurant = (restaurantId) => {
  //   const restaurant = restaurants.find((r) => r.id === restaurantId);
  //   if (restaurant) {
  //     console.log(`Button clicked for restaurant: ${restaurant.name}`);
  //     window.open(restaurant.url);
  //   }
  // };

  const handleVisitRestaurant = (restaurantId) => {
    const restaurant = restaurants.find((r) => r.id === restaurantId);
    if (restaurant) {
      setShowRestaurantDetails(true);
      setSelectedRestaurant(restaurant);
    }
  };

  const menuData = [
    {
      category: "Appetizers",
      items: [
        {
          name: "Bruschetta",
          image:
            "https://plus.unsplash.com/premium_photo-1668095398193-58a63a440464?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnJ1c2NoZXR0YXxlbnwwfHwwfHx8MA%3D%3D",
        },
        {
          name: "Chicken Wings",
          image:
            "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fENoaWNrZW4lMjBXaW5nc3xlbnwwfHwwfHx8MA%3D%3D",
        },
        {
          name: "Caprese Salad",
          image:
            "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q2FwcmVzZSUyMFNhbGFkfGVufDB8fDB8fHww",
        },
      ],
    },
    {
      category: "Main Courses",
      items: [
        {
          name: "Spaghetti Carbonara",
          image:
            "https://plus.unsplash.com/premium_photo-1674511582428-58ce834ce172?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8U3BhZ2hldHRpJTIwQ2FyYm9uYXJhfGVufDB8fDB8fHww",
        },
        {
          name: "Grilled Salmon",
          image:
            "https://images.unsplash.com/photo-1604909052868-dd2ef1e53daa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdyaWxsZWQlMjBzYWxtb258ZW58MHx8MHx8fDA%3D",
        },
        {
          name: "Vegetable Stir-Fry",
          image:
            "https://images.unsplash.com/photo-1543826173-1beeb97525d8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFZlZ2V0YWJsZSUyMFN0aXIlMjBGcnl8ZW58MHx8MHx8fDA%3D",
        },
      ],
    },
    {
      category: "Desserts",
      items: [
        {
          name: "Tiramisu",
          image:
            "https://media.istockphoto.com/id/2066878003/photo/traditional-unbaked-tiramisu-cake.webp?b=1&s=170667a&w=0&k=20&c=ZD18M65muYfMm0z6lTveXKOUTXCPu8N1z4g1w2syGGo=",
        },
        {
          name: "Chocolate Cake",
          image:
            "https://plus.unsplash.com/premium_photo-1666662657930-7c3c39a12062?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Q2hvY29sYXRlJTIwQ2FrZXxlbnwwfHwwfHx8MA%3D%3D",
        },
        {
          name: "Fruit Tart",
          image:
            "https://images.unsplash.com/photo-1614649672613-cd7cae06fedf?dpr=2&h=294&w=294&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8NTczMjgzMTB8fGVufDB8fHx8fA%3D%3D",
        },
      ],
    },
  ];


  // const handleResendClick = () => {
  //   console.log("Resend clicked");
  // };

  const onSignup = () => {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const phoneNumber = "+" + ph;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          },
        }
      );
    }
  }

  function onOTPVerify() {
    setLoading(true);

    window.confirmationResult
      .confirm(OTP)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        setUser(user);
        setLoading(false);
        // ...
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }

  

  return (
    <>
      <div className="banner py-4 bg-gredient">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-2">
              <div className="banbanner-column">
                <h5 className="subtitle">For your Team</h5>
                <h1 className="main-title">
                  A RELIABLE <br /> MEAL PLAN IS <br /> A MUST
                </h1>
                <div className="row-img d-flex gap-4 mt-4">
                  <div className="showing_item">
                    <img src={"assets/logo/logo.png"} />
                    <div className="content">
                      <p>
                        <b>Spicy noodles</b>
                      </p>
                      <p>* * * * *</p>
                      <p>$18.00</p>
                    </div>
                  </div>
                  <div className="showing_item">
                    <img src={"assets/logo/logo.png"} />
                    <div className="content">
                      <p>
                        <b>Spicy noodles</b>
                      </p>
                      <p>* * * * *</p>
                      <p>$18.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6} className="mb-2">
              <div className="banbanner-column text-center">
                <img src={"assets/Top_banner.png"} />
              </div>
            </Col>
          </Row>

          <div className="search-loaction text-center mt-4 p-4 bg-white rounded-4">
            <h2>Find reliable, quality catering, fast</h2>

            <InputGroup className="mb-3 mt-4 ">
              <InputGroup.Text id="basic-addon1">
                <FontAwesomeIcon icon={faLocationDot} />{" "}
              </InputGroup.Text>

              <Form.Control
                type="email"
                className="rounded-pill py-2"
                placeholder="Enter your delivery location"
                aria-label="email"
                aria-describedby="basic-addon1"
              />
              <Button variant="primary" type="submit">
                Search
              </Button>
            </InputGroup>
          </div>
        </Container>
      </div>

      <section className="second_section py-4 bg-gredient">
        <Container>
          <Row className="align-items-center ">
            <Col md={6} className="mb-2 image">
              <img src={"assets/meet_image.png"} />
            </Col>
            <Col md={6} className="mb-2 content">
              <h6 className="sub_title">Tasty How The New</h6>
              <h1 className="main_title">
                Meet Your New <br /> Lunchtime Faves
              </h1>
              <Button variant="primary">See All </Button>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="corporate_section">
        <Container>
          <Row className="align-items-end text-center ">
            <Col md={6} className="mb-2 content">
              <img src={"assets/image_2024_05_06T11_58_54_865Z.png"} />

              <div className="content_text">
                <h6 className="sub_title">Why Choose Us</h6>
                <h1 className="main_title">
                  If You're A <br /> Corporate
                </h1>
                <p>
                  Our business values you, we give utmost importance to our
                  customers. Truthfulness, integrity and high professionalism
                  are our pillars, with the mission to ensure that our client
                  relationships will last years. Here's what we can bring to the
                  table and to help you make a solid decision to choose Lunch On
                  Line as the food service for your next convention and the meal
                  plan delivery provider for your valued team members.
                </p>
                <Button variant="secondary">Book Appointment</Button>
              </div>
            </Col>
            <Col md={6} className="mb-2 image">
              <img src={"assets/image_2024_05_06T11_58_28_443Z.png"} />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="search_result">
        <Container>
          <Row>
            {restaurants.map((restaurant) => (
              <Col key={restaurant.id} md={4} className="mb-2 content">
                <Card>
                  <Card.Img variant="top" src={restaurant.url} />
                  <Card.Body>
                    <Card.Title>{restaurant.name}</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => handleVisitRestaurant(restaurant.id)}
                    >
                      Visit Restaurtant
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="show_restaurtants" id="show_restaurtant">
        {showRestaurantDetails && selectedRestaurant && (
          <div
            className="restaurant_detail"
            id="restaurants_details"
            style={{ backgroundImage: `url(${selectedRestaurant.url})` }}
          >
            <Container>
              <Row>
                <Col lg={12} className=" mx-auto imagess text-center">
                  <h2>{selectedRestaurant.name}</h2>
                  <p>Details about {selectedRestaurant.name} go here...</p>
                </Col>
                <Col lg={12}>
                  {menuData.map((category, index) => (
                    <div key={index}>
                      <h2>{category.category}</h2>
                      <Row>
                        {category.items.map((item, idx) => (
                          <div key={idx} className="col-lg-4">
                            <div className="menu-item">
                              <img src={item.image} alt={item.name} />
                              <p>{item.name}</p>
                            </div>
                          </div>
                        ))}
                      </Row>
                    </div>
                  ))}
                </Col>
              </Row>
            </Container>
          </div>
        )}
      </section>

      <section id="otp-section" className="text-center">
        <Container>
          <Row className="align-items-center">
            <Col lg={12}>
              <Toaster toastOptions={{ duration: 4000 }} />
              <div id="recaptcha-container"></div>
              {user ? (
                // Show logged in user content
                <h2>Login</h2>
              ) : (
                <>
                  {showOTP ? (
                    <>
                      <label htmlFor="otp" className="font-bold text-xl text-white text-center">
                        Enter your OTP
                      </label>
                      <OTPInput
                        value={OTP}
                        onChange={setOTP}
                        autoFocus
                        OTPLength={6}
                        otpType="number"
                        disabled={false}
                        secure
                        className="text-center"
                      />
                      {/* <ResendOTP
                        onResendClick={() => {
                          handleResendClick();
                        }}
                      /> */}
                      <button className="text-center" onClick={onOTPVerify}>
                        {loading && <CgSpinner size={30} className="mt-1 animate-spin" />}
                        <span>Verify OTP</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                        <BsTelephoneFill size={30} />
                      </div>
                      <label htmlFor="" className="font-bold text-xl text-white text-center">
                        Verify your phone number
                      </label>
                      <PhoneInput country={"in"} value={ph} onChange={setPh} />
                      <button
                        onClick={onSignup}
                        className="w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                      >
                        {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
                        <span>Send code via SMS</span>
                      </button>
                    </>
                  )}
                </>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Home;

import React, { Component } from "react";
import {
  Formik,
  Field,
  Form,
  useField,
  useFormikContext,
  ErrorMessage,
} from "formik";
import { Alert, Spinner } from "react-bootstrap";
import { Redirect, Route } from "react-router-dom";

import { updateRequest } from "../../network/lib/article";
import { articleStorage, userStorage } from "../../chromeHelper";
import afterRequest from "./after_request"

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasArticle: undefined,
      isSuccess: false,
    };
    articleStorage.get((article) => {
      this.state.hasArticle = article;
    });
  }
  render() {
    if (this.state.hasArticle)
    return (
      <div>
          {" "}
          {this.state.hasArticle === "noArticle" ? (
            <Alert variant="info"> No Article </Alert>
          ) : (
        <Formik
          initialValues={{
            id: "123",
            type: "request",
            content: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            var ids = { articleid: "", userid: "" };
            articleStorage.get((article) => {
              ids["articleid"] = article.id;
              console.log(article);
            });
            userStorage.get((user) => {
              ids["requestedby"] = user.userId;
              console.log(user);
            });
            console.log(ids);
            console.log(values);
            sleep(1000).then(() => {
              var data = Object.assign({}, ids, values);

              updateRequest(data)
                .then((res) => {
                  console.log(res);
                  this.setState({ isSuccess: true });
                  setSubmitting(false);
                })
                .catch((err) => {
                  console.log(err);
                });
            });

            // alert(JSON.stringify(values, null, 2));
            //console.log(JSON.stringify(values, null, 2));
          }}
          validate={(values) => {
            let errors = {};
            if (values.content == "") {
              errors.category = "You must fill in your request!";
            }
            if (values.rating == "null") {
              errors.rating = "Rating is required!";
            }
            if (values.fake == "null") {
              errors.fake = "You must have thoughts!";
            }
            return errors;
          }}
        >
          {({ handleSubmit, errors, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              {this.state.isSuccess && <Redirect to="/afterRequest" />}
                  <Route path="/afterRequest">
                    <afterRequest />
                  </Route>
              <div className="commentsField">
                <Field
                  id="content"
                  name="content"
                  as="textarea"
                  rows="3"
                  maxLength="250"
                  placeholder="Type here your request"
                />
                <ErrorMessage
                  component="div"
                  name="content"
                  className="text-red-500 text-xs italic"
                />
              </div>
              <div className="submitButton">
                <button
                  className="btn-two blue mini"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit Request
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
      </div>
    );
    else
      return (
        <div>
          <Spinner animation="border" role="status">
            <span className="sr-only"></span>
          </Spinner>
        </div>
      );
  }
}

export default Request;

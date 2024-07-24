import axios from "axios";
import url from "url";
/*import fedextokens_ from "../models/fedextokens_.js";*/

import useState from "react";
export const getToken = async (req, res) => {
  try {
    const params = new url.URLSearchParams({
      grant_type: "client_credentials",
      client_id: "l7d724850d3e794b79a27ea321b4db5cd5",
      client_secret: "db37eee8-3c90-4b7f-872c-171708672f57",
    });
    const response = await axios.post(
      "https://apis.fedex.com/oauth/token",
      params.toString()
    );

    const token = response.data.access_token;
    res.json({
      token: token,
    });

    /*try {
      await fedextokens_.update(
        { token: token },
        {
          where: { id: "1" },
        }
      );
      res.json({
        message: "El registro fue actualizado correctamente",
      });
    } catch (error) {
      res.json({ message: error.message });
    }*/
  } catch (error) {}
};

export const getTrackings = async (req, res) => {
  let token = "a";
  await axios
    .get("http://localhost:8000/fedex/getToken")
    .then((res) => (token = res.data.token));
  try {
    const response = await axios.post(
      "https://apis.fedex.com/track/v1/associatedshipments",

      {
        includeDetailedScans: true,
        associatedType: "STANDARD_MPS",
        masterTrackingNumberInfo: {
          shipDateEnd: "2025-01-01",
          shipDateBegin: "2023-01-01",
          trackingNumberInfo: {
            trackingNumberUniqueId: req.params.unique,
            carrierCode: "FDXE",
            trackingNumber: req.params.id,
          },
        },
        pagingDetails: {
          resultsPerPage: 56,
          pagingToken: "38903279038",
        },
      },
      {
        headers: {
          Authorization: "bearer " + token,
        },
      }
    );

    //Toda la data
    const tracking =
      response.data.output.completeTrackResults[0].trackResults[0]
        .latestStatusDetail;

    /*const city =
      response.data.output.completeTrackResults[0].trackResults[0]
        .deliveryDetails.actualDeliveryAddress.city;

    const estado =
      response.data.output.completeTrackResults[0].trackResults[0]
        .deliveryDetails.actualDeliveryAddress.stateOrProvinceCode;

    const pais =
      response.data.output.completeTrackResults[0].trackResults[0]
        .deliveryDetails.actualDeliveryAddress.countryName;*/

    res.json({
      description: tracking,
      /*ciudad: city,
      estado: estado,
      pais: pais,*/
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

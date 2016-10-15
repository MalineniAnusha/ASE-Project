package com.example.malin.onestopforcs;


import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;

import org.apache.http.client.utils.URLEncodedUtils;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;

/**
 * Created by ACHU on 10/12/2016.
 */
public class HTTPConnection {

    public String requestGet(String request_url, Map<String,String> requestParams) {
        String response = null;

        // set parameter request
        List<org.apache.http.NameValuePair> params = new ArrayList<org.apache.http.NameValuePair>();
        for (Map.Entry<String, String> entry : requestParams.entrySet()) {
            params.add(new org.apache.http.message.BasicNameValuePair(entry.getKey(), entry.getValue()));
        }

        String paramString = URLEncodedUtils.format(params, "UTF-8");
        request_url = request_url + "?" + paramString;

        Log.i("HTTPConnection", request_url);

        try {
            URL url = new URL(request_url);
            HttpsURLConnection conn = (HttpsURLConnection)url.openConnection();

            if (conn != null) {
                BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));

                StringBuilder buf = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    buf.append(line);
                }
                reader.close();
                response = buf.toString();
                Log.d("HTTPConnection", response);
            }
        } catch (MalformedURLException e) {
            e.printStackTrace();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return response;
    }

    public Bitmap downloadImage(String image_url){
        Bitmap bmp = null;
        Log.d("HTTPConnection", image_url);

        try {

            URL url = new URL(image_url);
            HttpURLConnection conn = (HttpURLConnection)url.openConnection();
            InputStream stream = conn.getInputStream();
            bmp = BitmapFactory.decodeStream(stream);
            stream.close();

        } catch(Exception e) {
            e.printStackTrace();
        }

        return bmp;
    }
}




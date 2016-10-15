package com.example.malin.onestopforcs;

import android.util.Log;

import org.w3c.dom.Document;
import org.w3c.dom.Element;

import java.io.ByteArrayInputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import javax.xml.parsers.DocumentBuilderFactory;

/**
 * Created by ACHU on 10/12/2016.
 */
public class ParseXML {

    public static int parseSearchResponseCount(String xml) {
        int total = 0;

        try {
            // DOM Instance get to use
//            Document document = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(xml);
            Document document = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(
                    new ByteArrayInputStream(xml.getBytes("UTF-8")));

            // root element acquisition
            Element elementRoot = document.getDocumentElement();

            // count element acquisition
            Element elementTotalCount = (Element)((Element)elementRoot.getElementsByTagName("Meta").item(0))
                    .getElementsByTagName("TotalResults").item(0);
            total = Integer.parseInt(elementTotalCount.getFirstChild().getNodeValue());
            Log.d("ParseXML", "TotalResults=" + total);

        } catch (Exception e) {
            Log.d("ParseXML", e.getMessage());
            e.printStackTrace();
        }

        return total;
    }
    public static List<Map<String,String>> parseSearchResponse(String xml) {
        List<Map<String,String>> list = new ArrayList<>();

        try {
            // DOM Instance get to use the
//            Document document = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(xml);
            Document document = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(
                    new ByteArrayInputStream(xml.getBytes("UTF-8")));

            // root Element acquisition
            Element elementRoot = document.getDocumentElement();

            // count Element acquisition
            Element elementCount = (Element)((Element)elementRoot.getElementsByTagName("Meta").item(0))
                    .getElementsByTagName("NumResults").item(0);
            Element elementTotalCount = (Element)((Element)elementRoot.getElementsByTagName("Meta").item(0))
                    .getElementsByTagName("TotalResults").item(0);
            int count = Integer.parseInt(elementCount.getFirstChild().getNodeValue());
            int total_count = Integer.parseInt(elementTotalCount.getFirstChild().getNodeValue());
            Log.d("ParseXML", "NumResults=" + count + ", TotalResults=" + total_count);

            // items List acquisition
            for (int i=0; i<count; i++) {
                Element elementItem = (Element)elementRoot.getElementsByTagName("Slideshow").item(i);
                Element elementId = (Element)elementItem.getElementsByTagName("ID").item(0);
                Element elementTitle = (Element)elementItem.getElementsByTagName("Title").item(0);

                String id = elementId.getFirstChild().getNodeValue();
                String title = elementTitle.getFirstChild().getNodeValue();
                Log.d("ParseXML", "ID=" + id);
                Log.d("ParseXML", "Title=" + title);

                Map<String,String> map = new HashMap<>();
                map.put("id", id);
                map.put("title", title);
                list.add(map);
            }
        } catch (Exception e) {
            Log.d("ParseXML", e.getMessage());
            e.printStackTrace();
        }

        return list;
    }

    public static Map<String,String> parseDetailResponse(String xml) {
        Map<String,String> map = new HashMap<>();

        try {
            // DOM Instance get to use the
            Document document = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(
                    new ByteArrayInputStream(xml.getBytes("UTF-8")));

            // root element acquisition
            Element elementRoot = document.getDocumentElement();

            Element elementId = (Element)elementRoot.getElementsByTagName("ID").item(0);
            Element elementTitle = (Element)elementRoot.getElementsByTagName("Title").item(0);
            Element elementDescription = (Element)elementRoot.getElementsByTagName("Description").item(0);
            Element elementURL = (Element)elementRoot.getElementsByTagName("URL").item(0);
//            Element elementImageURL = (Element)elementRoot.getElementsByTagName("ThumbnailURL").item(0);
            Element elementImageURL = (Element)elementRoot.getElementsByTagName("ThumbnailXXLargeURL").item(0);
            Element elementEmbedURL = (Element)elementRoot.getElementsByTagName("SlideshowEmbedUrl").item(0);
            Element elementCreated = (Element)elementRoot.getElementsByTagName("Created").item(0);
            Element elementUpdated = (Element)elementRoot.getElementsByTagName("Updated").item(0);

            String id = elementId.getFirstChild().getNodeValue();
            String title = elementTitle.getFirstChild().getNodeValue();
            String description = "";
            if (elementDescription.getFirstChild() != null) {
                description = elementDescription.getFirstChild().getNodeValue();
            }
            String url = elementURL.getFirstChild().getNodeValue();
            String image_url = elementImageURL.getFirstChild().getNodeValue();
            String embed_url = elementEmbedURL.getFirstChild().getNodeValue();
            String created = elementCreated.getFirstChild().getNodeValue();
            String updated = "";
            if (elementUpdated.getFirstChild() != null) {
                updated = elementUpdated.getFirstChild().getNodeValue();

            } else {
                updated = elementCreated.getFirstChild().getNodeValue();
            }

            Log.d("ParseXML", "ID=" + id);
            Log.d("ParseXML", "Title=" + title);
            Log.d("ParseXML", "Description=" + description);
            Log.d("ParseXML", "URL=" + url);
            Log.d("ParseXML", "ThumbnailURL=" + image_url);
            Log.d("ParseXML", "SlideshowEmbedUrl=" + embed_url);
            Log.d("ParseXML", "Created=" + created);
            Log.d("ParseXML", "Updated=" + updated);

            map.put("id", id);
            map.put("title", title);
            map.put("description", description);
            map.put("url", url);
            map.put("image_url", "http:" + image_url);
            map.put("embed_url", embed_url);
            map.put("created", utcToJst(created));
            map.put("updated", utcToJst(updated));

        } catch (Exception e) {
            Log.d("ParseXML", e.getMessage());
            e.printStackTrace();
        }

        return map;
    }

    private static String utcToJst(String from) {
        String to;

        try {
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            format.setTimeZone(TimeZone.getTimeZone("UTC"));
            Date date = format.parse(from);

            SimpleDateFormat convertFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            convertFormat.setTimeZone(TimeZone.getDefault());
            to = convertFormat.format(date);

        } catch (Exception e) {
            e.printStackTrace();
            Log.e("ParseXML", "failed timezone convert");
            to = from;
        }

        return to;
    }
}


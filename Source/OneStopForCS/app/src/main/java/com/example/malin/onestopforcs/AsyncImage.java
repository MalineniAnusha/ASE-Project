package com.example.malin.onestopforcs;

import android.app.Activity;
import android.graphics.Bitmap;
import android.os.AsyncTask;
import android.widget.ImageView;

/**
 * Created by ACHU on 10/12/2016.
 */
public class AsyncImage extends AsyncTask<String,Void,Bitmap> {
    private Activity mainActivity;

    public AsyncImage(Activity activity) {
        // The caller of activity
        this.mainActivity = activity;
    }

    @Override
    protected Bitmap doInBackground(String... url) {
        HTTPConnection conn = new HTTPConnection();
        return conn.downloadImage(url[0]);
    }

    @Override
    protected void onPostExecute(Bitmap bmp) {
        ImageView imageView = (ImageView)mainActivity.findViewById(R.id.imageView);
        imageView.setImageBitmap(bmp);
    }

}

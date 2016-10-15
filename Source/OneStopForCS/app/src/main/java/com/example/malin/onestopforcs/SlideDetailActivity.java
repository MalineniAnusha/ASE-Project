package com.example.malin.onestopforcs;


import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

/**
 * Created by ACHU on 10/12/2016.
 */
public class SlideDetailActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_slidedetail);

        Intent intent = getIntent();
        String id = intent.getStringExtra("id");

        Log.i("DetailActivity", "id=" + id);
//        Toast.makeText(this, id, Toast.LENGTH_LONG).show();

        getDetail(id);
    }

    public void getDetail(String slideshow_id) {
        APISlideShow.get(this, slideshow_id);
    }
}


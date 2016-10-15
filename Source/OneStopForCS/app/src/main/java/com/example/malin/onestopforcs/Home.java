package com.example.malin.onestopforcs;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.view.View;
import android.widget.Toast;

/**
 * Created by malin on 23-09-2016.
 */
public class Home extends AppCompatActivity {

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.homepage);
        Intent intent = getIntent();
        if(intent != null && !TextUtils.isEmpty(intent.getStringExtra(LoginActivity.NAME))) {
            Toast.makeText(Home.this, intent.getStringExtra(LoginActivity.NAME), Toast.LENGTH_SHORT).show();
        }
    }
    public void Navigate(View v) {
        Intent navigate = new Intent(Home.this, Preload.class);
        startActivity(navigate);
    }

    public void openslide(View v) {
        Intent slideshare = new Intent(Home.this, SlideMainActivity.class);
        startActivity(slideshare);
    }

    public void openScanner(View v) {
        Intent scannerclass = new Intent(Home.this, BarcodeScanner.class);
        startActivity(scannerclass);
    }

}

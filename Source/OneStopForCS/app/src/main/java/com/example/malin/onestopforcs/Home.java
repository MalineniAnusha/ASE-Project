package com.example.malin.onestopforcs;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.widget.Toast;

/**
 * Created by malin on 23-09-2016.
 */
public class Home extends AppCompatActivity {
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.home);
        Intent intent = getIntent();
        if(intent != null && !TextUtils.isEmpty(intent.getStringExtra(LoginActivity.NAME))) {
            Toast.makeText(Home.this, intent.getStringExtra(LoginActivity.NAME), Toast.LENGTH_SHORT).show();
        }
    }

}

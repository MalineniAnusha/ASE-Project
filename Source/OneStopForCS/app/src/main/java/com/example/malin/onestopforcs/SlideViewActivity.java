package com.example.malin.onestopforcs;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

/**
 * Created by ACHU on 10/12/2016.
 */
public class SlideViewActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_slideview);

        Intent intent = getIntent();
        String url = intent.getStringExtra("url");

        Log.i("ViewActivity", "url=" + url);

        WebView myWebView = (WebView)findViewById(R.id.webView);
        WebSettings webSettings = myWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        myWebView.setWebViewClient(new WebViewClient());
        myWebView.loadUrl(url);
    }
}

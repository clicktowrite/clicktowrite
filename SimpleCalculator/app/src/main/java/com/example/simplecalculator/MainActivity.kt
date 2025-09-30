package com.example.simplecalculator

import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button
import androidx.appcompat.app.AppCompatDelegate
import com.example.simplecalculator.databinding.ActivityMainBinding
import net.objecthunter.exp4j.ExpressionBuilder

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private var lastNumeric: Boolean = false
    private var stateError: Boolean = false
    private var lastDot: Boolean = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val themeSwitch = binding.themeSwitch
        themeSwitch.setOnCheckedChangeListener { _, isChecked ->
            if (isChecked) {
                AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES)
            } else {
                AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)
            }
        }
    }

    fun onDigit(view: View) {
        if (stateError) {
            binding.resultTextview.text = (view as Button).text
            stateError = false
        } else {
            binding.resultTextview.append((view as Button).text)
        }
        lastNumeric = true
    }

    fun onDecimalPoint(view: View) {
        if (lastNumeric && !stateError && !lastDot) {
            binding.resultTextview.append(".")
            lastNumeric = false
            lastDot = true
        }
    }

    fun onOperator(view: View) {
        if (lastNumeric && !stateError) {
            binding.resultTextview.append((view as Button).text)
            lastNumeric = false
            lastDot = false
        }
    }

    fun onClear(view: View) {
        this.binding.resultTextview.text = ""
        lastNumeric = false
        stateError = false
        lastDot = false
    }

    fun onEqual(view: View) {
        if (lastNumeric && !stateError) {
            val txt = binding.resultTextview.text.toString()
            val expression = ExpressionBuilder(txt).build()
            try {
                val result = expression.evaluate()
                binding.resultTextview.text = result.toString()
                lastDot = true
            } catch (ex: ArithmeticException) {
                binding.resultTextview.text = "Error"
                stateError = true
                lastNumeric = false
            }
        }
    }

    fun onBackspace(view: View) {
        if (!stateError) {
            val text = binding.resultTextview.text.toString()
            if (text.isNotEmpty()) {
                binding.resultTextview.text = text.substring(0, text.length - 1)
            }
        }
    }
}
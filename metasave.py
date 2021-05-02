from __future__ import unicode_literals
import io
import eel

eel.init('web')


@eel.expose
def metasave(arg):
    print(arg)
    return "got it"

eel.start('index.html',size=(700,700))
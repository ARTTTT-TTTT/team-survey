## Quickstart

### Create virtual environment
```bash
python3 -m venv env
```
```bash
python -m venv env
```
```bash
pip install -r requirements.txt
```

##

### Enable the virtual environment
```bash
source env/bin/activate
```
```bash
env\Scripts\activate
```
```bash
deactivate
```

### Compiles and hot-reloads for development
```bash
uvicorn src.main:app --reload
```
```bash
uvicorn src.main:app --host 0.0.0.0 --port 8000
```

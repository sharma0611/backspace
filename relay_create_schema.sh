# Note...assumes parallel directories Americano and Macchiato

python3 manage.py graphql_schema --settings=americano.settings

if [ -d "./macchiato/schema" ]; then
  cp schema.json ./macchiato/schema
  cd ./macchiato
  yarn relay
  cd ../
fi

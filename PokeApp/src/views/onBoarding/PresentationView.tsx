import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, Alert, Switch } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Card } from '@rneui/base';
import { LetterOnly, NumberOnly } from '../../utils/regex';

const options = {
    fields: {
        name: {
            label: 'Please enter your name',
            error: 'Name is not correct format',
            placeholder: 'Sacha'
        },
        favoritePokemon: {
            label: 'Any favorite Pokémon ?:',
        },
        age: {
            label: 'Enter your age:',
            error: 'Age is too low'
        }
    }
}

const PresentationView = (props: any) => {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            age: '',
            favoritePokemon: '',
            isValideProfile: true
        }
    });

    const handleSubmitForm = data => {

        const valuesForm = data;
        console.log('Values:', valuesForm)
        if (valuesForm) {
            console.log('Form validated')
        }
    };

    return (
        <View>
            <Card>
                <Card.Title>
                    <Text>Presentation Form</Text>
                </Card.Title>
                <View>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                            pattern: LetterOnly
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View>
                                <Text style={style.labelText}>{options.fields.name.label}</Text>
                                <TextInput
                                    style={style.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                                 {errors.name && <Text style={style.errorText}>{options.fields.name.error}</Text>}
                            </View>
                        )}
                        name="name"
                    />
                   

                    <Controller
                        control={control}
                        rules={{
                            maxLength: 100,
                            pattern: LetterOnly
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View>
                                <Text style={style.labelText}> {options.fields.favoritePokemon.label}(optional) </Text>
                                <TextInput
                                    style={style.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            </View>
                        )}
                        name="favoritePokemon"
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                            pattern: NumberOnly,
                            min:10
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View>
                                <Text style={style.labelText}>{options.fields.age.label}</Text>
                                <TextInput
                                    style={style.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                                {errors.age && <Text style={style.errorText}>{errors.age.message||options.fields.age.error}</Text>}
                            </View>
                        )}
                        name="age"
                    />
                    <View style={style.buttonContainer}>
                        <Button title="Submit" onPress={handleSubmit(handleSubmitForm)} />
                    </View>
                </View>
            </Card>

        </View>
    );
}

const style = StyleSheet.create({
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        height: 40,
        marginBottom: 10
    },
    buttonContainer: {
        marginTop: 20
    },
    labelText:{
        fontSize:16
    },
    errorText:{
        marginTop: -10,
        marginBottom: 10,
        color: 'red'
    }
})

export default PresentationView;
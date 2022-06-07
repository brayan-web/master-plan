import Axios from "axios";

export default {
    actions: {
        async sendInfoMessage(context, fdata) {
            if(fdata.desarrollo == null){
                fdata.desarrollo = 'No especificado';
            }
            let msgWrap = `<html>
                                <head>
                                    <title>Mensaje Web</title>
                                    <style>
                                        .red-color {
                                            color: red;
                                        }
                                        .container {
                                        width: 100%;
                                            position: relative;
                                        }
                                        .main-img {
                                            position: absolute;
                                            margin-right: auto;
                                            margin-left: auto;
                                            width: 500px;
                                            height: auto;
                                            display: block;
                                        }
                                        .title-mf {
                                            color: #14274a;
                                        }
                                        .text-center {
                                            text-align: center;
                                        }
                                        .text-md {
                                            font-size: 16px;
                                        }
                                        .force-full-width {
                                            width: 100% !important;
                                        }
                                    </style>
                                </head>
                                <body>
                                    <div class="container">
                                        <h1 class="title-mf text-center">Hay un nuevo mensaje en la web de Tres Marías</h1>

                                        <table cellspacing="0" cellpadding="0" class="force-full-width">
                                            <tr>
                                                <td style="border-bottom:1px solid #e3e3e3; font-weight: bold; text-align:left">
                                                Nombre
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="text-align:left;">
                                                    ${fdata.name}
                                                </td>
                                            </tr>
                                        </table>
                                        <br>
                                        <table cellspacing="0" cellpadding="0" class="force-full-width">
                                             <tr>
                                                <td style="border-bottom:1px solid #e3e3e3; font-weight: bold; text-align:left">
                                                 Numero de Telefono
                                                 </td>
                                            </tr>
                                             <tr>
                                                <td style="text-align:left;">
                                                     ${fdata.telefono}
                                                 </td>
                                             </tr>
                                        </table>
                                         <br>
                                         <table cellspacing="0" cellpadding="0" class="force-full-width">
                                         <tr>
                                            <td style="border-bottom:1px solid #e3e3e3; font-weight: bold; text-align:left">
                                             Ciudad
                                             </td>
                                        </tr>
                                         <tr>
                                            <td style="text-align:left;">
                                                 ${fdata.ciudad}
                                             </td>
                                         </tr>
                                    </table>
                                     <br>
                                        <table cellspacing="0" cellpadding="0" class="force-full-width">
                                            <tr>
                                                <td style="border-bottom:1px solid #e3e3e3; font-weight: bold; text-align:left">
                                                    Correo electrónico
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="text-align:left;">
                                                    ${fdata.email}
                                                </td>
                                            </tr>
                                        </table>
                                        <br>
                                        <table cellspacing="0" cellpadding="0" class="force-full-width">
                                            <tr>
                                                <td style="border-bottom:1px solid #e3e3e3; font-weight: bold; text-align:left">
                                                    Desarrollo de interés
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="text-align:left;">
                                                    ${fdata.desarrollo}
                                                </td>
                                            </tr>
                                        </table>
                                        <br>
                                        <table cellspacing="0" cellpadding="0" class="force-full-width">
                                            <tr>
                                                <td style="border-bottom:1px solid #e3e3e3; font-weight: bold; text-align:left">
                                                    Tipo de contacto
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="text-align:left;">
                                                    ${fdata.contactType}
                                                </td>
                                            </tr>
                                        </table>
                                        <br>
                                        <table ${!fdata.message ? 'style="display: none"' : ''} cellspacing="0" cellpadding="0" class="force-full-width">
                                            <tr>
                                                <td style="border-bottom:1px solid #e3e3e3; font-weight: bold; text-align:left">
                                                    Mensaje
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="text-align:left;">
                                                    ${fdata.message}
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </body>
                            </html>`;
            let params = {
                'message' : msgWrap,
                'app' : 'TM'
            };
            await Axios.post('https://hgbsdfn26g.execute-api.us-west-2.amazonaws.com/Prod/send', params);
        }
    }
}
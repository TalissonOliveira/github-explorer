const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    //source maps
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    // Arquivo de entrada
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    // Arquivo de saída
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        // tipos de arquivos que irá suportar
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        hot: true
    },
    plugins: [
        isDevelopment && new ReactRefreshWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        })
    ].filter(Boolean),
    // Configurações de como a aplicação irá se comportar de acordo com o tipo de arquivo
    module: {
        rules: [
            {
                test: /\.(j|t)sx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            isDevelopment && require.resolve('react-refresh/babel')
                        ].filter(Boolean)
                    }
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
}